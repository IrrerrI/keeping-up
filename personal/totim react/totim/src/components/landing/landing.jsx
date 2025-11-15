import CustomSplide from '../splide/splide.jsx' 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import lifeOnTheEdge from '../../assets/life-on-the-edge.jpg'
import parkFire from '../../assets/park-fire-24.jpg'
import shaboura from '../../assets/shaboura.jpg'


function Landing() {

  return (
    <>
    <main className="flex justify-between px-20 py-10">
        <section className='w-[50%]'>           
            <div className="about-content-container">
            <h2 className="section-title">About Us</h2>
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
          <Splide aria-label="My Favorite Images" className='w-96'>

            <SplideSlide>
              <CustomSplide image={lifeOnTheEdge} author="john doe" slideHeading="Life of the edge" location="Bengal, India" />
            </SplideSlide>

            <SplideSlide>
              <CustomSplide image={parkFire} author="jane smith" slideHeading="Park Fire 24" location="California, USA" />
            </SplideSlide>

            <SplideSlide>
              <CustomSplide image={shaboura} author="ahmad hassan" slideHeading="Shaboura" location="Gaza, Palestine" />
            </SplideSlide>
            </Splide>
        </section>
    </main>
    </>
  )
}

export default Landing