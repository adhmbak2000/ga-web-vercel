import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

type GAData = { [key: string]: number };

// --------------------------------------------------
// 🧬 Individual
// --------------------------------------------------
class Individual {
  genes: number[];
  fitness = 0;

  constructor(geneCount: number, genes?: number[]) {
    this.genes = genes ?? Array.from({ length: geneCount }, () => Math.random());
  }

  clone(): Individual {
    return new Individual(this.genes.length, [...this.genes]);
  }
}

// --------------------------------------------------
// 🧩 Fitness Evaluation
// --------------------------------------------------
class Fitness {
  data: GAData[];
  constructor(data: GAData[]) {
    this.data = data;
  }

  evaluate(ind: Individual) {
    let totalSquaredError = 0;
    const len = this.data.length;

    for (let r = 0; r < len; r++) {
      const row = this.data[r];
      const inputs = Object.values(row).slice(0, -1) as number[];
      const target = Object.values(row).slice(-1)[0] as number;

      let predicted = 0;
      for (let i = 0; i < ind.genes.length; i++) {
        predicted += inputs[i] * Math.max(0, ind.genes[i]);
      }

      const error = target - predicted;
      totalSquaredError += error * error;
    }

    // Normalize by number of rows → easier for fitness to approach 1
    ind.fitness = 1 / (1 + totalSquaredError / len);
  }
}

// --------------------------------------------------
// ⚙️ Genetic Algorithm
// --------------------------------------------------
class GeneticAlgorithm {
  population: Individual[];
  fitnessEvaluator: Fitness;
  mutationRate: number;
  bestIndividual: Individual | null = null;

  generationsStats: {
    avg: number;
    std: number;
    min: number;
    max: number;
  }[] = [];

  constructor(popSize: number, mutationRate: number, data: GAData[]) {
    this.fitnessEvaluator = new Fitness(data);
    this.mutationRate = mutationRate;

    const geneCount = Object.keys(data[0]).length - 1;
    this.population = Array.from({ length: popSize }, () => new Individual(geneCount));
  }

  evolve(maxGenerations: number) {
    let lastBest = 0;
    let stagnantGenerations = 0;

    for (let gen = 0; gen < maxGenerations; gen++) {
      // ---- Evaluate ----
      for (const ind of this.population) this.fitnessEvaluator.evaluate(ind);

      // ---- Sort ----
      this.population.sort((a, b) => b.fitness - a.fitness);
      this.bestIndividual = this.population[0];

      // ---- Stats ----
      const fitnessValues = this.population.map((i) => i.fitness);
      const avg = fitnessValues.reduce((a, b) => a + b, 0) / fitnessValues.length;
      const std = Math.sqrt(
        fitnessValues.reduce((s, f) => s + (f - avg) ** 2, 0) / fitnessValues.length
      );
      const min = Math.min(...fitnessValues);
      const max = Math.max(...fitnessValues);
      this.generationsStats.push({ avg, std, min, max });

      // ---- Early Stop ----
      const best = this.bestIndividual.fitness;
      if (best - lastBest < 1e-6) stagnantGenerations++;
      else stagnantGenerations = 0;

      if (best > 0.999 || stagnantGenerations > 200) break;

      lastBest = best;

      // ---- Reproduce ----
      const nextGen: Individual[] = [this.bestIndividual.clone()];

      while (nextGen.length < this.population.length) {
        const p1 = this.tournamentSelection(5);
        const p2 = this.tournamentSelection(5);
        const child = this.crossover(p1, p2);
        this.mutate(child);
        nextGen.push(child);
      }

      this.population = nextGen;
    }
  }

  // ---- Selection ----
  tournamentSelection(k: number): Individual {
    let best: Individual | null = null;
    for (let i = 0; i < k; i++) {
      const contestant = this.population[Math.floor(Math.random() * this.population.length)];
      if (!best || contestant.fitness > best.fitness) best = contestant;
    }
    return best!;
  }

  // ---- Crossover ----
  crossover(p1: Individual, p2: Individual): Individual {
    const point = Math.floor(Math.random() * (p1.genes.length - 1)) + 1;
    const genes = p1.genes.map((g, i) => (i < point ? g : p2.genes[i]));
    return new Individual(genes.length, genes);
  }

  // ---- Mutation ----
  mutate(ind: Individual) {
    for (let i = 0; i < ind.genes.length; i++) {
      if (Math.random() < this.mutationRate) {
        ind.genes[i] += (Math.random() * 2 - 1) * 0.3;
        ind.genes[i] = Math.max(0, Math.min(1, ind.genes[i]));
      }
    }
  }
}

// --------------------------------------------------
// 🧠 API Handler
// --------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const { csvData, populationSize = 100, mutationRate = 0.05, maxGenerations = 10000 } =
      await req.json();

    const parsed = Papa.parse<GAData>(csvData, { header: true, dynamicTyping: true });
    const data = parsed.data.filter((r) => Object.keys(r).length > 0);

    if (!data.length) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const ga = new GeneticAlgorithm(populationSize, mutationRate, data);
    ga.evolve(maxGenerations);

    return NextResponse.json({
      bestFitness: ga.bestIndividual?.fitness,
      bestGenes: ga.bestIndividual?.genes,
      generationsStats: ga.generationsStats,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
