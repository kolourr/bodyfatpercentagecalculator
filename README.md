### Estimate Body Fat is a collection of body fat calculators

#### How to add the payment to a new page

* Put stripe.css above the html content within other stylesheet declarations
```
<link rel='stylesheet' href='../static/stripe.css'>
```

* Put stripe js related files after the html content
```
<script src='../static/stripe.js'></script>
<script src="https://js.stripe.com/v3/"></script>
```


* Configure the event handler with the proper handle function
```
<input type="file" id="upload" class="aifatclass" value="Choose a file" accept="image/*"
                               onchange='invoke_paid_estimation(analyze)' >
```

                               
<b>invoke_paid_estimation</b> - generic function to initialize the payment procedure <br>
<b>analyze</b> - specific function mapped to your backend endpoint

As example here is complete html for the AI calculator:

```
<h2 style="background-color:#faf1f0;border-bottom: none; text-align: center">BODY FAT CALCULATOR</h2>

<p style="background-color:#faf1f0; text-align: center; border-top: none; "> Body Fat Model Updated: June 1, 2020</p>

<div class="content">
    <div class="upload-demo-wrap">
        <div id="upload-demo"></div>
    </div>
    <div class="actions">
        <BR>
        <BR>
        <a class="btn file-btn">
            <span id='analyze-button' class="analyze-button" type='button'>UPLOAD MY IMAGE </span>

            <input type="file" id="upload" class="aifatclass" value="Choose a file" accept="image/*"
                   onchange='invoke_paid_estimation(analyze)'>
        </a>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

    </div>

    <div class='result-label'>
        <label id='result-text' style="color: #7aa125; font-size: 30px; font-family: futura; text-align:left;"> </label>

        <label id='result-label'
               style="color: white; font-size: 30px; font-weight: bold; font-family: futura; background-color: #ff9080;  "></label>
    </div>

</div>
```   


