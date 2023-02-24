
$(function() {
    $('#date-picker').datepicker({
        format: 'yyyy-mm-dd',
        endDate: '+0d',
        todayHighlight: true,
        autoclose: true,
        clearBtn: true,
    });
});

//---- Pic of the day section

function apodRequest() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);

        let copyright = data["copyright"];
        let date = data["date"];
        let explanation = data["explanation"];
        let hdurl = data["hdurl"];
        let media_type = data["media_type"];
        let title = data["title"];
        let url = data["url"];

        let imageType = `
        <div
            class="bg-image hover-overlay ripple shadow-1-strong rounded"
            data-ripple-color="light"
        >
            <img id="wrapper-image" src="" class="w-100" />
            <a id="wrapper-hdurl" href="" target="_blank">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
            </a>
        </div>
        `;
        let videoType = `
        <div class="ratio ratio-16x9">
            <iframe
            class="shadow-1-strong rounded"
            id="wrapper-video"
            src=""
            title="YouTube video"
            allowfullscreen
            ></iframe>
        </div>
        `;

        // Static elements
        document.getElementById("wrapper-title").innerHTML = title;
        document.getElementById(
        "wrapper-explanation"
        ).innerHTML = explanation;
        document.getElementById("wrapper-copyright").innerHTML = copyright;
        document.getElementById("intro-date").innerHTML = date;

        // If statement for images/videos
        if (media_type === "video") {
        document.getElementById("wrapper-media").innerHTML = videoType;
        document.getElementById("wrapper-video").src = url;
        } else {
        document.getElementById("wrapper-media").innerHTML = imageType;
        document.getElementById("wrapper-image").src = url;
        document.getElementById("wrapper-hdurl").href = hdurl;
        }
    }
    };

    let datepicker_date = document.getElementById("wrapper-date").value;
    let queryUrl = "https://api.nasa.gov/planetary/apod?";
    let queryKey = "api_key=XwcCCL5QPVTMqLctTb9HZWxDaiOdkx4TGnpCddNd&";
    let queryDate = "date=" + datepicker_date + "&";
    let queryFull = queryUrl + queryKey + queryDate;

    xmlhttp.open("GET", queryFull, true);
    xmlhttp.send();
}

//---- Gallery section

function imagesRequest() {
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let result = JSON.parse(this.responseText);
            let items =result.collection.items;

            let col1 ="";
            let col2 ="";

            for (let i = 1; i < 5; i++) {
                let title = items[i].data[0].title;
                let url = items[i].links[0].href;

                if (i == 1 || i ==3){
                    col2 = col2 + `
                    <div
                        class="bg-image hover-overlay ripple shadow-1-strong rounded"
                        data-ripple-color="light"
                    >
                        <img id="image"` + i + ` src="` + url + `"class="w-100 shadow-1-strong rounded mb-4" />
                        
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
                        
                    </div>
                    <section class="">
                        <h5>` + title + `</h5>
                    </section>
                    <br>
                    `;
                } else{
                    col1 = col1 + `
                    <div
                        class="bg-image hover-overlay ripple shadow-1-strong rounded"
                        data-ripple-color="light"
                    >
                        <img id="image"` + i + ` src="` + url + `" class="w-100 shadow-1-strong rounded mb-4" />
                        
                        <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
                        
                    </div>
                    <section class="">
                        <h5>` + title + `</h5>
                    </section>
                    <br>
                    `;
                }
                
            }
            document.getElementById("col1").innerHTML = col1;
            document.getElementById("col2").innerHTML = col2;

        }

    };

    let query = document.getElementById("query").value;
    let queryUrl = "https://images-api.nasa.gov/search?q=" + query + "&media_type=image";

    xmlhttp2.open("GET", queryUrl, true);
    xmlhttp2.send();
}
  

// Initial call on page load
apodRequest().onload;
