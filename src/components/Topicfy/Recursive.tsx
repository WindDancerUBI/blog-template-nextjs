import { ReactElement } from 'react'
import { Anchor } from 'antd'

const { Link } = Anchor

interface TocItem {
  anchor: string
  text: string
  children: Array<TocItem>
}

interface RecursiveProps {
  tocItem: TocItem
}

const Recursive = ({ tocItem }: RecursiveProps): ReactElement => {
  return (
    <Link href={`#${tocItem.anchor}`} title={tocItem.text}>
      {tocItem.children &&
        tocItem.children.map((item) => <Recursive key={item.anchor} tocItem={item} />)}
    </Link>
  )
}

export default Recursive
