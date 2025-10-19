import Navbar from "./components/nav";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* === Kolom Kiri: Form === */}
        <div className="border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Simulasi Angsuran
          </h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otr">OTR</Label>
              <Input id="otr" type="number" placeholder="Masukkan harga OTR" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dp">DP</Label>
              <Input id="dp" type="number" placeholder="Masukkan DP" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jangkaWaktu">Jangka Waktu</Label>
              <Input id="jangkaWaktu" type="number" placeholder="Dalam bulan" />
            </div>

            <Button className="w-full mt-2">Submit</Button>
          </div>
        </div>

        {/* === Kolom Kanan: Tabel === */}
        <div className="border rounded-lg shadow-sm p-6 overflow-x-auto">
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
                    <span>Harga Kendaraan</span>
                    <span className="font-medium">Rp. 240.000.000,00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Uang Muka</span>
                    <span className="font-medium">Rp. 48.000.000,00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Pokok Hutang</span>
                    <span className="font-medium">Rp. 192.000.000,00</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Bunga</span>
                    <span className="font-medium">Rp. 15.360.000,00</span>
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
              <TableRow>
                <TableCell>AGR00001</TableCell>
                <TableCell>1</TableCell>
                <TableCell>12.907.000</TableCell>
                <TableCell>2024-01-25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AGR00001</TableCell>
                <TableCell>1</TableCell>
                <TableCell>12.907.000</TableCell>
                <TableCell>2024-01-25</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
