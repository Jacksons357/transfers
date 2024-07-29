import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b">
    <div className="flex h-16 items-center gap-6 px-6">
      <span>Loja 80</span>

      <Separator orientation="vertical" className="h-6" />

      <div className="ml-auto flex items-center gap-2">
      </div>
    </div>
  </div>
  )
}