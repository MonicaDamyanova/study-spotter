import './Footer.css'
import image from '../../assets/queens_logo.png'

function Footer (){

    return (
        <div className = "FooterBackdrop">

            <div className = "FooterTop">

                <div className = "Location">
                
                    <a href = 'https://www.google.com/maps/place/Joseph+S.+Stauffer+Library/@44.2281373,-76.4984285,17z/data=!3m2!4b1!5s0x4cd2ab04378e155b:0x1d8b449543128f55!4m6!3m5!1s0x4cd2ab81ed3c62ab:0x94b3a31b6f63b7e6!8m2!3d44.2281373!4d-76.4958536!16s%2Fg%2F11f33y0086?hl=en&entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D' target = '_blank' className = "AddressLocation">
                        ⚲ Joseph Stauffer Library  
                    </a>
                </div>

            </div>

            <div className = "FooterBottom">

                <img
                className = "QueensLogos"
                src = {image}
                alt = "Queen's Emblum"
                />

                <a href = 'https://www.queensu.ca/indigenous/ways-knowing/land-acknowledgement#profile-tab' target='_blank' className = "Land">
                    Queen's University is situated on the territory of the Haudenosaunee and Anishinaabek.
                </a>

                <div className = "Copyright">Copyright © Queen's University</div>

            </div>

            


        </div>

    )
}

export default Footer