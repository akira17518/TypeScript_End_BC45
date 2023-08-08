import React, { useEffect, useState } from 'react'

type Props = {}

const BackToTopButton = (props: Props) => {
    const [backToTopButton,setBackToTopButton] = useState (false);

    useEffect(() =>{
     window.addEventListener('scroll',()=>{
        if (window.scrollY > 250 ) {
            setBackToTopButton(true)
        } else {
            setBackToTopButton(false)
        }
     })
    },[])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior : 'smooth'
        })
    }

  return (
    <div>
        {backToTopButton && (
            <button onClick={scrollUp} style={{
                color: '#f2f2f2',
                backgroundColor: '#3ce4c5',
                textDecoration: 'none',
                border : 'none',
                borderRadius: '25px',
                position: 'fixed',
                outline: 'none',
                zIndex: 100,
                padding: '0.5em 0.75em',
                top: 'auto',
                right: '2em',
                bottom: '2em',
                left: 'auto',
            

            }}><i className="fa fa-arrow-alt-circle-up fs-3"></i></button>
        )}
    </div>
  )
}

export default BackToTopButton