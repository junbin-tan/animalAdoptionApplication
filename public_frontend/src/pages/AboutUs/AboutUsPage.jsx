import React from "react";
import "./AboutUsPage.css";
import animal1 from "../../images/img.jpeg";
import animal2 from "../../images/img01.jpeg";
import animal3 from "../../images/img02.jpeg";
import animal4 from "../../images/img03.jpeg";
import animal5 from "../../images/img04.jpeg";
import animal6 from "../../images/img05.jpeg";
import animal7 from "../../images/img06.jpeg";
import animal8 from "../../images/img07.jpeg";

const AboutUsPage = () => {
    return (
    <>
    <h2 style={{textAlign: "center"}}> About Us</h2>

    <div className="top-section">
        <h4> <strong>What</strong> we do?</h4>
        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Id eu nisl nunc mi ipsum faucibus. Nisl nisi scelerisque eu ultrices. Imperdiet dui accumsan sit amet nulla facilisi. 
            Non diam phasellus vestibulum lorem sed. Ac felis donec et odio pellentesque diam volutpat commodo sed. 
            Arcu cursus vitae congue mauris rhoncus. Mauris augue neque gravida in fermentum et sollicitudin ac. 
            Et tortor consequat id porta nibh venenatis cras sed felis. A condimentum vitae sapien pellentesque. 
            Est pellentesque elit ullamcorper dignissim cras. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut.
            Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Nisl tincidunt eget nullam non nisi est sit. 
            Sed odio morbi quis commodo odio aenean sed adipiscing diam. Lacinia quis vel eros donec ac odio tempor orci. 
            Egestas congue quisque egestas diam in arcu. Bibendum enim facilisis gravida neque convallis a cras. 
            Sed ullamcorper morbi tincidunt ornare massa eget egestas. Dui nunc mattis enim ut tellus elementum sagittis. 
            Metus vulputate eu scelerisque felis. Cursus risus at ultrices mi tempus imperdiet nulla.
        </h5>   
        <div className="top-image-section">
            <img src={animal1} alt="Animal1" />
            <img src={animal2} alt="Animal2" />
            <img src={animal3} alt="Animal3" />
            <img src={animal4} alt="Animal4" />
        </div>
    </div>

    <div className="middle-section">
        <h4> <strong>How</strong> we do it?</h4>
        <h4> <strong>Advocate & Educate</strong></h4>
        <h5>
        Pawfect actively advocates against the culling of our street dogs as well as for changes to stray management policies and the welfare of strays. 
        Our work is grounded in compassion for our street dogs who often lead very harsh and miserable lives, often as a result of the land on which 
        they live on being taken over for the purposes of construction and due to the callousness of man. 
        Whilst Pawfect recognises that not everyone may be an animal lover, this is no excuse for the abuse that our street dogs often suffer, 
        often leaving them dead or severely maimed. We continually advocate against abuse and also educate the public on how not to provoke 
        stray dogs that they may encounter. It is also Pawfect’s mission to reach out to the public to correct the common misconception that 
        mongrels are all ferocious, dirty and somehow, second-class dogs compared to pedigree breeds. Mongrels are extremely intelligent and 
        generally tend to be healthier than pure breds given their varied genetic makeup. Street dogs make exceedingly loyal pets, grateful 
        for a home and for the love shown to them.
        </h5>   

        <h4> <strong>Rescue & Rehome</strong></h4>
        <h5>
        Pawfect rescues and rehomes as many stray dogs and puppies as our limited resources allow us to. . For the ones that are wounded, 
        we do what we can to give them good veterinary care and help nurse them back to health before finding them homes. Rescue efforts 
        entail an astronomical cost that includes trapping and redemption operations, boarding fees and vet care. We do not own a shelter 
        andare currently renting a few kennels from a commercial entity as a temporary holding area for some of our rescues. 
        But kennel space fills up very quickly and we will have to depend on available fosterers in order to save more dogs as 
        we are unable to undertake a rescue if we have nowhere for the dog to go to. We are constantly finding that there are more dogs and 
        pups to be rescued than there are fosterers. In order to save more lives, it is imperative that we have our very own Pawfect shelter. 
        We are working towards building it. But we can’t do it alone. Rehoming street dogs in Singapore is another uphill task but we do our best. 
        Pawfect adopts a mandatory screening process for every potential adoption. This is to ensure that our rescued dogs do not fall into the wrong hands, 
        and that all goes well for the dog and family.
        </h5>   

        <h4> <strong>Sterilization for Humane Population Control</strong></h4>
        <h5>
        SOSD believes in sterilisation as a humane method for the control of the stray population. We sterilise our adult dogs before 
        we put them up for adoption and follow-up on our adopted puppies to ensure that they are sterilised when they are old enough. 
        SOSD also advocates that our authorities implement a nationwide sterilisation program for our street dogs.
        </h5>   

        <div className="middle-image-section">
            <img src={animal5} alt="Animal5" />
            <img src={animal6} alt="Animal6" />
            <img src={animal7} alt="Animal7" />
            <img src={animal8} alt="Animal8" />
        </div>
    </div>
    </>
    );

}
export default AboutUsPage;