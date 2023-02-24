import { motion } from 'framer-motion'
import { ReactElement } from 'react'
import { IoAdd, IoRemove } from 'react-icons/io5'
import { fromBottomAnimation } from '../../../utils/animations'
import Accordion from '../../Accordion'

const faqData = [
  {
    heading: 'Why should you use our APIs?',
    body: 'The ERC721 contracts used in our API are highly gas efficient, making it more cost-effective for game developers to deploy and mint NFTs.',
  },
  {
    heading: 'What are the fees for the marketplace?',
    body: '1 %, one of the lowest in industry',
  },
  {
    heading: 'Can I contact GamesToWeb3 Devs about the API?',
    body: 'Yes. You can reach out to us by raising a ticket on Discord or emailing us at',
    email: 'hello@blockatena.com',
  },
  {
    heading: 'How can I obtain an API Key?',
    body: 'Please submit a request here. (Request it on Discord #Raise-a-ticket)',
  },
  {
    heading: 'Does GamesToWeb3 have an API Documentation?',
    body: 'Yes. Our Docs can be found here: ',
    link: 'https://gamestoweb3.readme.io/',
  },
]

function Faq(): ReactElement {
  const renderedFaqItems = faqData.map(({ heading, body, link, email }, i) => (
    <Accordion.Item key={i}>
      <Accordion.Header openIcon={<IoAdd />} closeIcon={<IoRemove />}>
        {heading}
      </Accordion.Header>
      <Accordion.Body>
        {body}{' '}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-custom_yellow hover:text-custom-yellow-hover"
          >
            {link}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-custom_yellow hover:text-custom-yellow-hover"
          >
            {email}
          </a>
        )}
      </Accordion.Body>
    </Accordion.Item>
  ))

  return (
    <section className="py-16 lg:py-24  px-[5%] 2xl:px-[12%] text-white bg-[#0A0A0A]">
      <motion.div
        className="grid place-items-center"
        variants={fromBottomAnimation}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          delay: 0.2,
        }}
      >
        <Accordion>
          <Accordion.Title>Frequently Asked Questions</Accordion.Title>
          <Accordion.Frame>{renderedFaqItems}</Accordion.Frame>
        </Accordion>
      </motion.div>
    </section>
  )
}

export default Faq
