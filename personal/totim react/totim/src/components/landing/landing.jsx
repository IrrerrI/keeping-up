import CustomSplide from '../splide/splide.jsx' 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import lifeOnTheEdge from '../../assets/life-on-the-edge.jpg'
import parkFire from '../../assets/park-fire-24.jpg'
import shaboura from '../../assets/shaboura.jpg'
import './landing.css'


function Landing() {
  const splideData = [
    {
      image: lifeOnTheEdge,
      author: "John Doe",
      slideHeading: "Life on the Edge",
      location: "Bengal, India"
    },
    {
      image: parkFire,
      author: "Jane Smith",
      slideHeading: "Park Fire 24",
      location: "California, USA"
    },
    {
      image: shaboura,
      author: "Ahmad Hassan",
      slideHeading: "Shaboura",
      location: "Gaza, Palestine"
    }
  ]

  return (
    <>
    <main className="flex justify-between px-20 py-10">
        <section className='w-[50%]'>           
            <div className="about-content-container">
            <h2 className="section-title underline">About Us</h2>
            <p>
              TOTIM is a photojournalist-driven narrative reporting platform.
            </p>
            <p>
              We license work from the archives of prominent and up-and-coming
              visual reporters, producing immersive photo-stories to inspire
              empathy, solidarity and action.
            </p>
            <p>
              At the heart of TOTIM's mission is the desire to expose and
              strengthen the connective tissue that binds us as a human
              community.
            </p>
          </div>
          </section>
        <section> 
          <Splide aria-label="Stories" className='w-96'>
            {splideData.map((slide, index) => (
              <SplideSlide key={index}>
                <CustomSplide {...slide} />
              </SplideSlide>
            ))}
            </Splide>
        </section>
    </main>
    </>
  )
}

export default Landing