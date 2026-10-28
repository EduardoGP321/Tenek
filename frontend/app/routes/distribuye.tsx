import { DistributionSection } from "~/features/distribution/DistributionSection";
import type { Route } from "./+types/distribuye";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Distribuye Tenek | Cervecería Tenek" },
        { name: "description", content: "Lleva cerveza artesanal Tenek a tu bar, restaurante o tienda especializada." },
    ];
}

export default function DistribuyePage() {
    return (
        <main className="w-full">
            <DistributionSection />
        </main>
    );
}