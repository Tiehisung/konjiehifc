import Skeleton from 'react-loading-skeleton';
import { FC } from 'react';

interface IPlaceholderProps {
  type?: 'avatar' | 'table' | 'page' | 'grid';
}

const Placeholder: FC<IPlaceholderProps> = ({ type = 'avatar' }) => {
  switch (type) {
    case 'avatar':
      return <Skeleton  width={40} height={40} />;
    case 'table':
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[...Array(3)].map((_, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j}  width={80} height={20} />
              ))}
            </div>
          ))}
        </div>
      );
    case 'page':
      return (
        <div
          style={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Skeleton  width={200} height={10} className='w-full'/>
          <Skeleton  width={300} height={20} className='w-full'/>
          <Skeleton  width={200} height={40} className='w-full'/>
          <Skeleton  width={200} height={40} className='w-full'/>
          <Skeleton  width={200} height={40} className='w-full'/>
        </div>
      );
    case 'grid':
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              
              width={100}
              height={100}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default Placeholder;
