import styles from './card_tricks.module.css';

function CardTricks(tricks: any[]) {
  return (
    <div className={styles.cardTrickContainer}>
      {tricks.map((e: any) =>
        CardTrick({
          title: e.title,
          description: e.description,
          userId: e.userId,
          imageUrl: e.imageUrl,
          id: e.id,
        })
      )}
    </div>
  );
}

interface CardTrickProp {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string;
}

function CardTrick(prop: CardTrickProp) {
  return (
    <div className={`${styles.cardTrick} card`}>
      <div className='card-body'>
        <h5 className='card-title'>{prop.title}</h5>
        <p className={`${styles.descriptionTrick} card-text`}>
          {prop.description}
        </p>
        <img
          src={prop.imageUrl}
          alt={prop.title}
          className={styles.imageTrick}></img>
        <p className='cart-text'>User: {prop.userId.slice(0, 10)}</p>
        <p className='cart-text'>Id: {prop.id.slice(0, 10)}</p>
      </div>
    </div>
  );
}

export default CardTricks;
