
var ele=document.getElementById("demo");
var contain=``;
for(var i=1;i<=10;i++){
    contain += `<div class="col-md-3 bg-danger">
          <div class="item border border-2">
            <img src="./images/banquemisr_photo.PNG" class="w-100" alt="" />
            <h1>hello ${i}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus unde quia, pariatur dolore possimus, aperiam sunt
              iure rem harum vero molestias distinctio tempore sint nulla ea
              similique saepe quibusdam amet?
            </p>
          </div>
        </div>`;

    
}
ele.innerHTML=contain