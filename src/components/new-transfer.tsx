import { Button } from "./ui/button";
import { Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogDescription, 
  DialogTitle, 
  DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from 'zod'
import {} from '@hookform/resolvers'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { searchCode } from "@/api/search-code";
import { useToast } from "./ui/use-toast";

const transferSchema = z.object({
  id: z.number(),
  productName: z.string(),
  ean: z.string(),
  quantity: z.string(),
  lote: z.string().nullable(),
  validate: z.string().nullable(),
  destiny: z.string(),
  approved: z.boolean(),
  date: z.string(),
})

export type TransfersSchema = z.infer<typeof transferSchema>

interface NewTransferProps {
  onAddTransfer: (transfer: TransfersSchema) => void
}

export function NewTransfer({ onAddTransfer }: NewTransferProps) {
  const [productName, setProductName] = useState('')
  const [ean, setEan] = useState('')
  const [quantity, setQuantity] = useState('')
  const [lote, setLote] = useState('')
  const [validate, setValidate] = useState('')
  const [destiny, setDestiny] = useState('')

  const { register, setFocus } = useForm<TransfersSchema>()

  const { toast } = useToast()

  useEffect(() => {
    setFocus('ean')
  }, [setFocus])

  function addNewTransfer() {
    toast({
      title: "Transferência adicionada com sucesso!",
      duration: 3000
    })

    const currentDate = new Date().toISOString()
    const newTransfer = {
      id: Date.now(),
      productName,
      ean,
      quantity,
      lote,
      validate,
      destiny,
      approved: false,
      date: currentDate,
    }
    onAddTransfer(newTransfer)

    setProductName('')
    setQuantity('')
    setLote('')
    setValidate('')
    setDestiny('')
    setEan('')
    setFocus('ean')
  }

  async function handleChangeEan(event: React.ChangeEvent<HTMLInputElement>) {
    const eanCodeTarget = event.target.value
    setEan(eanCodeTarget)

    if (eanCodeTarget) {
      const product = await searchCode(eanCodeTarget)
      setProductName(product)
    } else {
      setProductName('Produto não encontrado')
    }
  }

  return (
    <div className="text-right">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Nova Transferência</Button>
        </DialogTrigger>
          <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Transferência</DialogTitle>
            <DialogDescription>
              Informe os dados para solicitar uma nova transferência.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ean" className="text-right">
                Código de barra
              </Label>
              <Input
                id="ean"
                value={ean}
                className="col-span-3"
                {...register('ean', {
                  onChange: handleChangeEan
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Produto
              </Label>
              <Input
                id="productName"
                className="col-span-3"
                disabled
                value={productName}
                {...register('productName', {
                  onChange: (e) => setProductName(e.target.value)
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantidade
              </Label>
              <Input
                id="quantity"
                value={quantity}
                className="w-28"
                {...register('quantity', {
                  onChange: (e) => setQuantity(e.target.value)
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lote" className="text-right">
                Lote
              </Label>
              <Input
                id="lote"
                value={lote}
                className="w-28"
                {...register('lote', {
                  onChange: (e) => setLote(e.target.value)
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validate" className="text-right">
                Validade
              </Label>
              <Input
                id="validate"
                value={validate}
                className="w-28"
                {...register('validate', {
                  onChange: (e) => setValidate(e.target.value)
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destiny" className="text-right">
                Destino
              </Label>
              <Input
                id="destiny"
                value={destiny}
                className="w-28"
                {...register('destiny', {
                  onChange: (e) => setDestiny(e.target.value)
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button"
              onClick={addNewTransfer}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
