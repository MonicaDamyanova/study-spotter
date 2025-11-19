import './Feedback.css'

function SignInPage () {
    return (
        <>
        
        

        


        <div className = "Background">
            

            <div className = "SignInBoxParent">

                <div className = "IssueBox">

                    <div className = "MaintenanceRequestFormTitle">Maintenance Request Form</div>

                    <input type = "text" placeholder='Floor' className = "Floor" />
                    
                    <textarea placeholder = "Describe the Issue" className = "DescribeIssue"></textarea>

                    

                    <button className = "SendRequestButton">Send Request</button>


                </div>

                

            </div>



        </div>

        <div className = "Spacer2"></div>
        
        
        
        </>
        
        


    )
}

export default SignInPage

