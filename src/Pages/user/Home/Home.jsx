import style from './Home.module.css'
import Categories from '../../../component/user/categories/Categories';
import { useEffect, useState } from 'react';
import Loader from '../../../component/loader/Loader';
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>

      {
        loading ? (<Loader />) :
          (
            <>
              <div className={style.coverHome}>
                <h1>Elegance Store</h1>
              </div>

              <div className='container'>
                <div className='mt-5'>
                  <Categories />
                </div>
              </div>

            </>
          )
      }

    </>
  );
}