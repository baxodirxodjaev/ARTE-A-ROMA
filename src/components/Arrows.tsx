import next from '../../public/icons/next.png'
import back from '../../public/icons/back.png'
import { MouseEventHandler } from 'react';


export  const PrevArrow = ({ onClick } : {onClick : MouseEventHandler<HTMLDivElement>}) => {
     return (
         <div
         onClick={onClick}
         className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 hover:scale-110 duration-150 text-white opacity-65  size-[3rem] rounded-full cursor-pointer"
         >
    <img src={back} alt="back arrow" />
  </div>
     )
};


export const NextArrow = ({ onClick }: {onClick : MouseEventHandler<HTMLDivElement>}) => {

    return (

        <div
        onClick={onClick}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-slate-500/60 hover:bg-black/80 hover:scale-110 duration-150 text-white opacity-65  size-[3rem] rounded-full cursor-pointer"
        >
    <img src={next} alt="mext arrow" />
  </div>
    )
};
