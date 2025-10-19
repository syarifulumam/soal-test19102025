import { useState } from "react";
import { Form } from "./components/form";
import Navbar from "./components/nav";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import type { FormResult } from "./type/formresult";

function App() {
  const [hasilSimulasi, setHasilSimulasi] = useState<FormResult | null>(null);

  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto flex gap-4 p-4">
        <Form onResult={setHasilSimulasi} />

        {hasilSimulasi && (
          <div className="w-full border rounded-lg shadow-sm p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Hasil Perhitungan
            </h2>
            <Table>
              <TableCaption>
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Rincian
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pokok Hutang</span>
                      <span className="font-medium">
                        Rp. {hasilSimulasi.pokokHutang.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Bunga</span>
                      <span className="font-medium">
                        {(hasilSimulasi.bunga * 100).toFixed(0)} %
                      </span>
                    </div>
                  </div>
                </div>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>KONTRAK NO</TableHead>
                  <TableHead>ANGSURAN KE</TableHead>
                  <TableHead>ANGSURAN PER BULAN</TableHead>
                  <TableHead>TANGGAL JATUH TEMPO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: hasilSimulasi.jangka }, (_, i) => {
                  const angsuranKe = i + 1;
                  const tanggalSekarang = new Date();

                  // Tambah bulan sesuai urutan angsuran
                  const jatuhTempo = new Date(
                    tanggalSekarang.getFullYear(),
                    tanggalSekarang.getMonth() + angsuranKe,
                    tanggalSekarang.getDate()
                  );

                  // Format tanggal ke YYYY-MM-DD (lokal)
                  const formattedTanggal = `${jatuhTempo.getFullYear()}-${String(
                    jatuhTempo.getMonth() + 1
                  ).padStart(2, "0")}-${String(jatuhTempo.getDate()).padStart(
                    2,
                    "0"
                  )}`;

                  return (
                    <TableRow key={angsuranKe}>
                      <TableCell>AGR00001</TableCell>
                      <TableCell>{angsuranKe}</TableCell>
                      <TableCell>
                        {hasilSimulasi.angsuran.toLocaleString()}
                      </TableCell>
                      <TableCell>{formattedTanggal}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
