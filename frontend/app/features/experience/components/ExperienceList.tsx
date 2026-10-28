import Container from "~/components/ui/Container";
import type { Experiencia } from "~/types";
import { ExperienceEditorialRow } from "./ExperienceEditorialRow";

interface ExperienceListProps {
    experiencias: Experiencia[];
}

export function ExperienceList({ experiencias }: ExperienceListProps) {
    return (
        <section className="relative w-full py-6 sm:py-10 pb-28 bg-transparent text-neutral-900">
            <Container>

                <div className="flex flex-col space-y-8 sm:space-y-12">
                    {experiencias.map((exp, index) => (
                        <ExperienceEditorialRow
                            key={exp.id}
                            experiencia={exp}
                            index={index}
                        />
                    ))}
                </div>


                {experiencias.length === 0 && (
                    <div className="py-20 text-center rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-sm backdrop-blur-md">
                        <p className="font-sans text-stone-500 text-sm">
                            No hay experiencias registradas por el momento.
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}