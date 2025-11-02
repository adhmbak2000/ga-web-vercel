import { NextRequest, NextResponse } from "next/server";

export interface GenerateRequestBody {
  rows: number;
  cols: number;
}

export interface GAData {
  [key: string]: number;
}

export async function POST(req: NextRequest) {
  try {
    const { rows, cols }: GenerateRequestBody = await req.json();

    if (rows <= 0 || cols <= 0) {
      return NextResponse.json({ error: "Rows and columns must be positive" }, { status: 400 });
    }

    // Define consistent column names
    const headers = Array.from({ length: cols }, (_, i) => `Column_${i + 1}`);

    // Pick a hidden rule (the GA will try to learn this)
    const formulaOptions = [
      // (a: number, b: number, c: number, d: number) => 0.3 * a + 0.5 * b - 0.2 * c + d * 0.1,
      // (a: number, b: number, c: number, d: number) => a * 0.4 + b * 0.3 + c * 0.2 + d * 0.1,
      // (a: number, b: number, c: number, d: number) => (a + b) / (c + 5) + Math.sin(d / 10) * 2,
      // (a: number, b: number, c: number, d: number) => Math.log(a + 5) * 2 + Math.sqrt(Math.abs(b - c)) + d * 0.05,
      (a: number, b: number, c: number, d: number) => a + b + c + d,
    ];

    const formula = formulaOptions[(Math.random() * formulaOptions.length) | 0];

    // Randomly pick which columns the formula depends on
    const indices = Array.from({ length: 4 }, () => (Math.random() * cols) | 0);

    const generated: GAData[] = new Array(rows);

    for (let r = 0; r < rows; r++) {
      const values = Array.from({ length: cols }, () => Math.random() * 100);
      const [a, b, c, d] = indices.map((i) => values[i]);

      // Calculate output deterministically from the formula
      const calc = formula(a, b, c, d);

      const row: GAData = {};
      headers.forEach((h, i) => (row[h] = Math.round(values[i] * 100) / 100));

      // Target (the GA should predict this)
      row["Target"] = Math.round(calc * 100) / 100;

      generated[r] = row;
    }

    return NextResponse.json(generated);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
