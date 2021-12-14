import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"
import { useState, useRef } from "react"
import ListItem from "../ListItem/ListItem"
import "./lists.scss"

export default function Lists() {
     const [isMoved, setIsMoved] = useState(false);
     const [slideNumber, setSlideNumber] = useState(0);

     const listRef = useRef();
     
     const handleClick = function(direction){
          setIsMoved(true);
          let distance = listRef.current.getBoundingClientRect().x-45;
          if(direction === 'left' && slideNumber < 5){  // not the right way, 5 is a hard-coded value
               setSlideNumber(slideNumber + 1)
               listRef.current.style.transform = `translateX(${-260+distance}px)`;
               // listRef.current.style.transform = `translateX(${250}px)`;
          };
          if(direction === 'right' && slideNumber > 0){
               setSlideNumber(slideNumber - 1)
               listRef.current.style.transform = `translateX(${260+distance}px)`;;
          };
          // console.log(listRef.current.getBoundingClientRect());
     };
     
     return (
          <div className="list">
               <span className="listTitle">Continue to watch</span>
               <div className="wrapper">
                    <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={function(){handleClick("right")}}
                    style={{display: !isMoved && "none"}} />
                    
                    {/* call react hook here */}
                    <div className="container" ref={listRef}>
                         <ListItem index={0} />
                         <ListItem index={1} />
                         <ListItem index={2} />
                         <ListItem index={3} />
                         <ListItem index={4} />
                         <ListItem index={5} />
                         <ListItem index={6} />
                         <ListItem index={7} />
                         <ListItem index={8} />
                         <ListItem index={9} />
                    </div>

                    <ArrowForwardIosOutlined className="sliderArrow right" onClick={function(){handleClick("left")}} />
               </div>
          </div>
     )
}
