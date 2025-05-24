import { Card } from "fox-neo-design-system"

export function HomePageOurAdvantages() {
        const advantages = [
            {
                title: " Produtos Exclusivos e Personalizados", 
                description: "Investimentos exclusivos e produtos financeiros personalizados,  adaptados às necessidades de cada cliente,  com acesso a oportunidades de alto rendimento."
            },
           { 
                title: "Plataforma de Investimentos Internacional",
                description: "Acesso a investimentos internacionais, permitindo diversificação e expansão de seu portfólio para mercados globais."
           },
           {
               title: "Acesso Antecipado a Novos Produtos",
               description: "Investimentos exclusivos e produtos financeiros personalizados,  adaptados às necessidades de cada cliente,  com acesso a oportunidades de alto rendimento."
            },
            {
                title: "Plataforma Digital Intuitiva",
                description: "Acesso digital fácil e intuitivo, com aplicativos e plataformas que oferecem controle total sobre suas finanças, investimentos e contas bancárias, com interface amigável e recursos exclusivos."
            },
        ]
    return (
        <section className="flex flex-col items-center gap-8 px-10">
            <h4 className="font-title font-medium text-brand-800 text-2xl mt-14 text-center">Vantagens do nosso banco</h4>
                    
            <ul className="grid grid-cols-1 grid-rows-1 xl:grid-cols-2 xl:grid-rows-2 gap-4 justify-center items-stretch grid-auto-rows-fr">
                {advantages.map(({title, description}) => (
                    <li key={title}>
                        <Card.Root  variant="outlined" className="min-h-[150px] items-stretch">
                            <Card.Title className="text-center">{title}</Card.Title>
                            <Card.Paragraph className="text-center">
                                {description}
                            </Card.Paragraph>
                        </Card.Root>
                    </li>

                ))}
            </ul>
        </section>
    )
}