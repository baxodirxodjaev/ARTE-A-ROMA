import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react'



const faq=[
    {
        title : "Sono un principiante / I'm a beginner",
        descriptionEN : "Our event is open to everyone, from complete beginners to experienced art lovers. Our instructor will guide you step by step to help you create a unique artwork. No prior experience is required — just bring your curiosity and enjoy the creative process!",
        descriptionIT : "Il nostro evento è pensato per tutti, dai principianti assoluti agli appassionati più esperti. La nostra insegnante ti accompagnerà passo dopo passo per aiutarti a creare un’opera d’arte unica. Non è richiesta alcuna esperienza precedente, solo la voglia di divertirsi e lasciarsi ispirare! "

    },
    {
        title : "Dove si svolge l’evento / Where does the event take place",
        descriptionEN : "We host our gatherings in beautiful locations around Rome, which change depending on the theme or season. You will receive all the details about the venue a few days before the event.",
        descriptionIT : "Organizziamo i nostri incontri in varie location suggestive di Roma, che cambiano a seconda del tema o della stagione. Riceverai tutti i dettagli precisi sulla posizione qualche giorno prima dell’evento. "
    },
    {
        title : "Quanto dura / How long does it last",
        descriptionEN : "Approximately 3 hours." ,
        descriptionIT : "Circa 3 ore.  "
    },
    {
        title : "Cosa devo portare / What should I bring",
        descriptionEN : "Just bring yourself and your curiosity! No equipment or artistic experience is required." ,
        descriptionIT : "Porta solo te stesso e la tua curiosità! Non è richiesta alcuna attrezzatura o esperienza artistica. "
    },
    {
        title : "Posso portare un amico / Can I bring a friend",
        descriptionEN : "Yes , it’s always more fun with a friend! Feel free to bring a friend or family member.",
        descriptionIT : "Sì, è sempre più bello condividere l’esperienza con qualcuno! Sii libero di portare un amico o un familiare. "
    },
    {
        title : "Posso pagare con carta di credito / Can I pay with credit card ",
        descriptionEN: " Yes, you can pay with credit card through PayPal or another payment method.",
        descriptionIT : "Sì, puoi pagare con carta di credito tramite PayPal o altro."
    },
    {
        title : "Posso pagare in contanti / Can I pay in cash ",
        descriptionEN : "Yes, you can pay in cash.",
        descriptionIT : "Sì, puoi pagare in contanti. "
    },
    {
        title : "Posso cancellare la mia prenotazione / Can I cancel my booking ",
        descriptionEN : "Yes, you can cancel your booking up to 24 hours before the event.",
        descriptionIT : "Sì, puoi cancellare la tua prenotazione fino a 24 ore prima dell’evento. "
    },
    {
        title : "Devo portare il vino / Should I bring my own wine?",
        descriptionEN : "No, we’ve got you covered. Wine is included in the experience, and we carefully select it to perfectly complement the evening. ",
        descriptionIT : "No, penseremo a tutto noi. Il vino è incluso nell’esperienza e lo selezioniamo con cura per accompagnare al meglio la serata. "
    },
    {
        title : "Non bevo alcol / I don't drink alcohol",
        descriptionEN : "No worries! We also offer non-alcoholic options such as juices and water, so everyone can enjoy the evening in their own way.",
        descriptionIT : "Nessun problema! Offriamo anche opzioni analcoliche come succhi di frutta e acqua, così tutti possono godersi la serata a modo loro.  "
    },
    {
        title : "Posso portare il quadro che creo / Can I keep the painting that I create?",
        descriptionEN : "Absolutely! At the end of the experience, you can take your artwork home. We will provide everything you need to carry it safely.",
        descriptionIT : "Assolutamente sì! Alla fine dell’esperienza potrai portare a casa la tua opera d’arte. Ti forniremo tutto il necessario per trasportarla comodamente.  "
    },
    {
        title : "Sono ammessi i cani / Are dogs allowed?",
        descriptionEN : "Yes, furry friends are welcome as long as they are well-behaved and respectful of other participants. ",
        descriptionIT : "Sì, gli amici a quattro zampe sono i benvenuti, purché siano tranquilli e rispettino lo spazio degli altri partecipanti.  "
    }
]


const Faq = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

  return (
    <section className="container mx-auto py-16 px-6 max-w-3xl">
    <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">FAQ — Domande Frequenti</h2>
    <div className="space-y-4">
      {faq.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-100 transition-colors duration-300"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-medium text-gray-700">{item.title}</span>
            <motion.span
              initial={false}
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ⌄
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto', opacity: 1 },
                  collapsed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden text-gray-600"
              >
                <div className="p-4 border-t border-gray-200 flex flex-col gap-4">
                    <span>
                        {item.descriptionEN} 
                    </span>
                    <span>
                        {item.descriptionIT} 
                    </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  </section>
  )
}

export default Faq