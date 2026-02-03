import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <Card>
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      <Input placeholder="digita ai" className="mt-5" />
      <Button className="mt-5">Botão</Button>
    </Card>
  );
}
