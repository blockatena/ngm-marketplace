import { ReactElement } from 'react'
import Accordion from '../Accordion'

const faqData = [
  {
    heading: 'Why should you use our APIs?',
    body: 'As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.',
  },
  {
    heading: 'What are the fees for the marketplace?',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, sed deleniti. Necessitatibus dignissimos quidem doloremque fugit veritatis cum corporis officiis iusto voluptatibus itaque, natus recusandae!',
  },
  {
    heading: 'Can I contact GamesToWeb3 Devs about the API?',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, sed deleniti. Necessitatibus dignissimos quidem doloremque fugit veritatis cum corporis officiis iusto voluptatibus itaque, natus recusandae!  ',
  },
  {
    heading: 'Can I contact GamesToWeb3 Devs about the API?',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, sed deleniti. Necessitatibus dignissimos quidem doloremque fugit veritatis cum corporis officiis iusto voluptatibus itaque, natus recusandae!  ',
  },
  {
    heading: 'Can I contact GamesToWeb3 Devs about the API?',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, sed deleniti. Necessitatibus dignissimos quidem doloremque fugit veritatis cum corporis officiis iusto voluptatibus itaque, natus recusandae!  ',
  },
]

function Faq(): ReactElement {
  const renderedFaqItems = faqData.map(({ heading, body }, i) => (
    <Accordion.Item key={i}>
      <Accordion.Header>{heading}</Accordion.Header>
      <Accordion.Body>{body}</Accordion.Body>
    </Accordion.Item>
  ))

  return (
    <section className="py-16 lg:py-24  px-[5%] 2xl:px-[12%] text-white bg-[#0A0A0A]">
      <div className="grid place-items-center">
        <Accordion>
          <Accordion.Title>Frequently Asked Questions</Accordion.Title>
          <Accordion.Frame>{renderedFaqItems}</Accordion.Frame>
        </Accordion>
      </div>
    </section>
  )
}

export default Faq
