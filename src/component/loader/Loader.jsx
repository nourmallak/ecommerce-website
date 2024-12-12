import { Circles } from 'react-loader-spinner';
import style from '../loader/loader.module.css'
export default function Loader() {
  return (
    <>
    <div className={`${style.loader}`}>
    <Circles
  height="80"
  width="80"
  color="#A78D78"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  </div>
    </>
  );
}