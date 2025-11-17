import image from '../../../assets/Stauffer.jpg'
import './Home.css'

function Home() {
  return (


    <>
    
    
    <div className = "HomeContainer">
        <img
        src = { image }
        alt = "Stauffer Library"
        className = "StaufferPicture"
        />

        <div className = "TitleClass">
            <h1 className = "Title">About Study Spotter</h1>
            <h2 className = "SubTitle">Study Spotter was created to help students quickly and easily find available seating across campus. By reducing the time spent searching for open study spaces, Study Spotter lets students focus more on what really matters - studying, collaborating, and making the most of their time at university. The platform was designed with convenience and efficiency in mind, ensuring that every student can find the perfect spot to study when they need it most.</h2>


        </div>

        <div className = "BackdropParent">
            <div className = "Backdrop">

                <h1 className = "Suggestions">
                We Value Your Feedback!
                </h1>

                <h2 className = "SuggestionsText">
                    Your suggestions help us improve Study Spotter and make it even more useful for students. If you have any ideas, comments, or thoughts, please share them - your input plays a key role in helping us develop and enhance our platform.
                </h2>

            </div>

            
        </div>
        
        




    </div>
    


    <div className = "Spacer"></div>
    </>
    

    
  );
}

export default Home;
