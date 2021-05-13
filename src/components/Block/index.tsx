import { ReactElement } from 'react';
import styles from './index.module.scss';

interface BlockProps {
  id?: string;
  title: string | ReactElement;
  className?: string;
  children: string | ReactElement;
}
const Block = (props: BlockProps): ReactElement => {
  return (
    <div className={`${styles['c-block']} ${props.className}`} id={props.id}>
      <fieldset className={styles['c-block-header']}>
        <legend>{props.title}</legend>
      </fieldset>
      <div className={styles['c-block-content']}>{props.children}</div>
    </div>
  );
};

export default Block;
