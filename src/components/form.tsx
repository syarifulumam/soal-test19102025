import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormResult } from "@/type/formresult";

const formSchema = z.object({
  otr: z.string().min(1, "OTR wajib diisi"),
  dp: z.string().min(1, "DP wajib diisi"),
  jangkaWaktu: z
    .string()
    .min(1, "Jangka waktu wajib diisi")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Jangka waktu minimal 1 bulan",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  onResult: (result: FormResult) => void;
}

export function Form({ onResult }: FormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // 🔹 format number ke "240.000.000"
  const formatNumber = (value: string) => {
    const numeric = value.replace(/\D/g, ""); // hapus semua non-digit
    if (!numeric) return "";
    return new Intl.NumberFormat("id-ID").format(Number(numeric));
  };

  // 🔹 handler ketika user mengetik OTR atau DP
  const handleNumberInput =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatNumber(e.target.value);
      setValue(field, formatted); // update nilai terformat ke form
    };

  const onSubmit = (data: FormValues) => {
    const otr = Number(data.otr.replace(/\./g, ""));
    const dp = Number(data.dp.replace(/\./g, ""));
    const jangka = Number(data.jangkaWaktu);

    const pokokHutang = otr - dp;
    let bunga = 0;
    if (jangka > 24) bunga = 16.5;
    else if (jangka > 12) bunga = 14;
    else bunga = 12;
    bunga = bunga / 100;

    // prettier-ignore
    // const angsuran = (pokokHutang + (pokokHutang * bunga)) / jangka;

    // Konversi jangka (bulan) ke tahun
    const tahun = jangka / 12;

    // // Hitung total bunga dan angsuran
    const totalBunga = pokokHutang * bunga * tahun;
    const totalBayar = pokokHutang + totalBunga;
    const angsuran = Math.round(totalBayar / jangka / 1000) * 1000;

    const hasil = {
      pokokHutang,
      bunga,
      jangka,
      totalBunga,
      totalBayar,
      angsuran,
    };

    onResult(hasil);
  };

  return (
    <div className="border rounded-lg shadow-sm p-6 w-1/3 min-w-1/3">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Simulasi Angsuran
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otr">OTR</Label>
            <Input
              id="otr"
              placeholder="Masukkan harga OTR"
              {...register("otr")}
              onChange={handleNumberInput("otr")}
              value={watch("otr") || ""}
            />
            {errors.otr && (
              <p className="text-red-500 text-sm">{errors.otr.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dp">DP</Label>
            <Input
              id="dp"
              placeholder="Masukkan DP"
              {...register("dp")}
              onChange={handleNumberInput("dp")}
              value={watch("dp") || ""}
            />
            {errors.dp && (
              <p className="text-red-500 text-sm">{errors.dp.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jangkaWaktu">
              Jangka Waktu <span className="text-gray-400">(Bulan)</span>
            </Label>
            <Input
              id="jangkaWaktu"
              placeholder="Contoh: 12"
              {...register("jangkaWaktu")}
            />
            {errors.jangkaWaktu && (
              <p className="text-red-500 text-sm">
                {errors.jangkaWaktu.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
