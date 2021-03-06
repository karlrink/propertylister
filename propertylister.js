
const version = '🌎 property lister 2022-05-26-6';

/* 
 * SPA (Single-Page Application)
 * https://developer.mozilla.org/en-US/docs/Glossary/SPA 
 */

const start = performance.now();

const origin = localStorage.getItem('origin');
const base64 = localStorage.getItem('base64');

const container = document.getElementById('container');

async function getResponse(response) {
    if ( ! response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
    }
    return response;
}


window.Login = Login;
function Login() {

    //let login_origin = window.prompt("url: ", 'http://127.0.0.1:9200');
    let login_origin = 'https://opensearch.nationsinfocorp.com';
    let login_user = window.prompt("username: ");
    let login_pass = window.prompt("password: ");
    let login_base64 = btoa(login_user + ':' + login_pass);

    localStorage.setItem('base64', login_base64);
    localStorage.setItem('origin', login_origin);

    history.pushState({page: 'login'}, "login", "?login=true");
    location.replace('?view=home');
}


window.Logout = Logout;
function Logout() {
    localStorage.clear();
    history.pushState({page: 'logout'}, "logout", "?logout=true");
    location.replace('?');
}


window.addLocalStore = addLocalStore;
function addLocalStore() {
   const item_name  = window.prompt("name: ");
   const item_value = window.prompt("value: ");
   localStorage.setItem(item_name, item_value);
   history.pushState({page: 'addLocalStore'}, "addLocalStore", "?view=info");
   location.replace('?view=info');
}


function viewHome() {

    //document.title = 'Home';

    let html = '';

    if ( ! localStorage.getItem('base64') ) {

        document.title = 'Login Required';

        html += `
        <style>

          body,html {
            background: white;
            color: black;
            background-color: white;
          }

          div { 
            text-align: center;
            vertical-align: middle;
            margin-top: 10%;
          }

        </style>

        <div>
              <a href="?login"><button type="none">Login</button></a>
        </div>
        `;

        history.pushState({page: 'home'}, "home", "");

    } else {

        document.title = 'Property Lister: Home';

        html = homeHTML;

        history.pushState({page: 'home'}, "home", "?view=home");
    }

    container.innerHTML = html;

    //history.pushState({page: 'home'}, "home", "?view=home");
}

function viewWelcome() {
    document.title = 'Property Lister: Welcome';
    container.innerHTML = welcomeHTML;
    history.pushState({page: 'welcome'}, "welcome", "?view=welcome");
}

function viewPhoto() {
    document.title = 'Property Lister: Photo';

    var script_capture = document.createElement('script');
    script_capture.src = 'js/capture.js?features=default';
    script_capture.async = true;

    document.head.appendChild(script_capture);

    let htmlSegment = `
    <header class="boarder-top-red">

        <a href="?">
          <div>

          <i class="fa fa-home icon"
            style="
               margin-top: 2px;
               color: #ff0037;
               font-size: 30px;
          "></i>

          </div>
        </a>

    </header>

    <main>

  <h1>
    Still photo capture
  </h1>

  <p>
   Select your built-in webcam
  </p>

<div class="select">
    <label for="audioSource">Audio source: </label><select id="audioSource"></select>
</div>

<div class="select">
    <label for="videoSource">Video source: </label><select id="videoSource"></select>
</div>

<br>

<div class="contentarea">

  <div class="camera">
    <video id="video" autoplay muted playsinline > Video stream not available. </video>
    <button id="startbutton">Take photo</button>
  </div>

  <br>

  <canvas id="canvas"></canvas>

  <div class="output">
        <img id="photo" alt="The screen capture will appear in this box.">
        <button id="postbutton">Post photo</button>
  </div>

</div>


<div id="postoutput" sytle="color:white;"></div>

    </main>

    <footer></footer>
    <br>
    `;

    container.innerHTML = htmlSegment;
    history.pushState({page: 'photo'}, "photo", "?view=photo");
}

/*
    <nav style="
                transform: scale(0.5);
                float: left;
                margin-top: -35px;
                margin-left: -50px;
    ">
*/
//<form id="form" onsubmit="submitForm(event)">

function viewSubmit() {

    document.title = 'Property Lister: Submit';

    let htmlSegment = '';

    htmlSegment += `
    <header class="boarder-top-red"> 

        <a href="?">
          <div>

          <i class="fa fa-home icon" 
            style="
               margin-top: 2px;
               color: #ff0037;
               font-size: 30px;
          "></i>

          </div>
        </a>

    </header>

<form id="form" onsubmit="submitForm(event)">

<div>

    <div class="hexagon-item">
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>   
        </div>
        <button class="hex-content">
            <span class="hex-content-inner">
                <span class="icon">
                    <i class="fa fa-bullseye"></i>
                </span>
                <span class="title">Submit</span>
            </span>
            <svg viewBox="0 0 0 0" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
            </svg>
        </button>
    </div>

<div>

<br>

      <label for="amount">amount:</label>
      <input type="text" id="amount" name="amount" placeholder="$1.00">
      <br>

      <br>

      <label for="street_address">street_address:</label>
      <input type="text" id="street_address" name="street_address" placeholder="22718 Haynes Street">
      <br>

      <label for="unit_number">unit_number:</label>
      <input type="text" id="unit_number" name="unit_number" placeholder="apt #13 (Optional)" value="">
      <br>

      <label for="city">city:</label>
      <input type="text" id="city" name="city" placeholder="West Hills">
      <br>

      <label for="county">county:</label>
      <input type="text" id="county" name="county" placeholder="Los Angeles (Optional)" value="">
      <br>

      <label for="state_or_province">state_or_province:</label>
      <input type="text" id="state_or_province" name="state_or_province" placeholder="CA">
      <br>

      <label for="postal_code">postal_code:</label>
      <input type="text" id="postal_code" name="postal_code" placeholder="91307">
      <br>

      <br>

      <hr>

    `;

      //<button type="submit">Submit</button>
      //<label for="hoa_fee">hoa_fee:</label>
      //<input type="text" id="hoa_fee" name="hoa_fee" placeholder="hoa_fee (Optional)">
      //<br>


    // for loop the field_options

    const field_options = [
      "description", "bedrooms", "baths_total", "features",
      "living_area_square_feet", "living_area", "lot_size",
      "hoa_fee", "parking", "year_built", 
      "school_district", "elementary_school", "middle_school", "high_school",
      "foundation", "room_list", "appliances", "floor_covering",
      "roof_type", "view_type",
      "latitude", "longitude",
      "fips", "condition", "stories", "total_units", "total_rooms",
      "family_room", "living_room", "den", "kitchen", "basement", 
      "heating", "cooling", "zoning", "parking_spaces",
      "pool", "style", "construction_type", "exterior_walls",
      "full_details", "owner_occupied" ];

    for (let i = 0; i < field_options.length; i++) {

        console.log(field_options[i]);

        let option = field_options[i];

        htmlSegment += `

          <label for="${option}">${option}:</label>
          <input type="text" id="${option}" name="${option}"" placeholder="${option} (Optional)">
          <br>

        `;

    }
                        


    htmlSegment += `


</form>

<main>
    <div id="form-output"></div>
</main>

<footer>
</footer>
    `;

    container.innerHTML = htmlSegment;

    const form = document.getElementById('form');

    history.pushState({page: 'submit'}, "submit", "?view=submit");
}

window.submitForm = submitForm;
async function submitForm(event) {

    event.preventDefault();


    // get all the values from the form
    const amount = event.target['amount'].value;

    const street_address = event.target['street_address'].value;
    const unit_number = event.target['unit_number'].value;
    const city = event.target['city'].value;
    const county = event.target['county'].value;
    const state_or_province = event.target['state_or_province'].value;
    const postal_code = event.target['postal_code'].value;

    // property_id = street_address + city + county + state_or_province + postal_code + unit_number
    const property_string = street_address + city + county + state_or_province + postal_code + unit_number;

    const property_id = await digestMessage(property_string);
    //console.log(property_id);


    const description = event.target['description'].value;
    const bedrooms = event.target['bedrooms'].value;


    const opensearch_data =
    {
      "property_id": property_id,
      "property_merged_id": null,
      "scrape_date": null,
      "list_date": null,
      "data_source_listing_id": null,
      "first_merge_date": null,
      "sale_type": null,
      "data_sources": null,
      "amount_definition": null,
      "amount": amount,
      "list_price": null,
      "original_loan_amount": null,
      "estimated_value": null,
      "opening_bid": null,
      "transfer_value": null,
      "rent": null,
      "mls_number": null,
      "mls_disclaimer": null,
      "parcel_number": null,
      "unit_number": unit_number,
      "street_address": street_address,
      "city": city,
      "county": county,
      "state_or_province": state_or_province,
      "postal_code": postal_code,
      "property_record_type": null,
      "bedrooms": bedrooms,
      "baths_total": null,
      "description": description,
      "features": null,
      "picture_count": null,
      "picture_data_url": null,
      "picture_data_source_url": null,
      "picture_remote": null,
      "listing_url": null,
      "source_url": null,
      "living_area_square_feet": null,
      "living_area": null,
      "lot_size": null,
      "hoa_fee": null,
      "parking": null,
      "year_built": null,
      "school_district": null,
      "elementary_school": null,
      "middle_school": null,
      "high_school": null,
      "foundation": null,
      "room_list": null,
      "appliances": null,
      "floor_covering": null,
      "roof_type": null,
      "view_type": null,
      "latitude": null,
      "longitude": null,
      "fips": null,
      "condition": null,
      "stories": null,
      "total_units": null,
      "total_rooms": null,
      "family_room": null,
      "living_room": null,
      "den": null,
      "kitchen": null,
      "basement": null,
      "heating": null,
      "cooling": null,
      "trust_deed_document_number": null,
      "nod_date_defaulted_lien": null,
      "nod_doc_number_defaulted_lien": null,
      "nod_date_default": null,
      "nod_amount_default": null,
      "nod_recording_date": null,
      "nod_recording_year": null,
      "nod_document_number": null,
      "auction_date": null,
      "auction_time": null,
      "nots_trustee_sale_number": null,
      "nots_auction_title": null,
      "nots_auction_address": null,
      "nots_auction_city": null,
      "nots_auction_state": null,
      "nots_auction_zip": null,
      "nots_auction_recording_date": null,
      "nots_auction_document_number": null,
      "nots_loan_date": null,
      "nots_loan_no": null,
      "nots_loan_default_amount": null,
      "nots_auction_house_name": null,
      "nots_auction_description": null,
      "nots_auction_terms": null,
      "nots_index_no": null,
      "reo_document_number": null,
      "judgment_amount": null,
      "legal_description": null,
      "zoning": null,
      "lis_pendens_index_no": null,
      "lis_pendens_recording_date": null,
      "lis_pendens_loan_date": null,
      "lis_pendens_docket_no": null,
      "lis_pendens_doc_no": null,
      "lis_pendens_loan_no": null,
      "lis_pendens_case_no": null,
      "hud_203k_eligible": null,
      "hud_bid_deadline": null,
      "hud_priority": null,
      "hud_sale_status": null,
      "hud_escrow_amount": null,
      "tax_sale_jurisdiction_name": null,
      "tax_sale_how_often": null,
      "tax_sale_rate": null,
      "tax_sale_redemption_period": null,
      "tax_sale_bid_method": null,
      "tax_sale_get_premium_back": null,
      "tax_sale_sale_cert_number": null,
      "assessed_valuation": null,
      "assessed_valuation_improvement": null,
      "assessed_valuation_land": null,
      "assessed_tax_year": null,
      "assessed_tax": null,
      "assessed_year_delinquent": null,
      "assessed_valuation_year": null,
      "assessed_valuation_date": null,
      "close_date": null,
      "close_price": null,
      "quality_score_sales": null,
      "quality_score_member": null,
      "quality_score_1": null,
      "quality_score_2": null,
      "quality_score_3": null,
      "quality_score_4": null,
      "quality_score_5": null,
      "quality_score_6": null,
      "quality_score_7": null,
      "quality_score_8": null,
      "quality_score_9": null,
      "quality_score_10": null,
      "home_score": null,
      "investor_score": null,
      "listing_status": null,
      "tracking": null,
      "reo_recording_date": null,
      "address_id": null,
      "avm_low": null,
      "avm_high": null,
      "avm_confidence": null,
      "avm_date": null,
      "estimated_rent": null,
      "monthly_amount_RTO_cove_algo": null,
      "monthly_amount_RTO_henrys_algo": null,
      "monthly_amount_30year_fixed_mortgage": null,
      "monthly_amount_5x1_arm_mortgage": null,
      "home_price_for_monthly": null,
      "full_street_name": null,
      "assessed_valuation_rate": null,
      "parking_spaces": null,
      "pool": null,
      "style": null,
      "construction_type": null,
      "exterior_walls": null,
      "sort_amount": null,
      "delete_reason": null,
      "estimated_monthly_payment": null,
      "paid_listing": null,
      "frstlk_exp_date": null,
      "100_dwn_pymnt": null,
      "hmpth_mrtge": null,
      "hmpth_renvtion_mrtge": null,
      "price_reduction": null,
      "nsp_home": null,
      "gnnd_exp_date": null,
      "specialty_home": null,
      "full_details": null,
      "alt_finance": null,
      "exclusive": null,
      "special_financing": null,
      "bargain_price": null,
      "fixer_upper": null,
      "rto_financing": null,
      "rto_potential": null,
      "FA_property_ID": null,
      "building_amenities": null,
      "disabled_ind": null,
      "geo_status_code": null,
      "lot_size_acres": null,
      "lot_size_depth_feet": null,
      "lot_size_frontage_feet": null,
      "owner_occupied": null,
      "prop_class_id": null,
      "veteran_ind": null,
      "widow_ind": null,
      "DTDB_Ref_ID": null,
      "coordinate": {
        "lat": null,
        "lon": null
      }
    }


    let htmlSegment = '';
    //let htmlSegment = 'output...';
    //htmlSegment += ' ' + property_id ;

    const url = origin + "/property-lister/_doc/" + property_id + ".json";

    const headers = {};
    headers['Authorization'] = 'Basic ' + base64;
    headers['Content-Type'] = 'application/json';

    const post = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(opensearch_data)
    })
    .then(getResponse)
    .catch(err => document.write('Request Failed ', err));

    const response = await post.json();

    console.log(JSON.stringify(response));

    htmlSegment += JSON.stringify(response);


    document.querySelector('#form-output').innerHTML = htmlSegment;

    history.pushState({page: 'submit:true'}, "submit:true", "?view=submit&true");

    alert(htmlSegment);

}

/*
POST  property-lister/_search
{
  "query": {
    "match_all": {}
  }
}
*/

/*


{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "property-lister",
        "_type" : "_doc",
        "_id" : "8bf6314b4039493ea55a6ab25d7960717a607089.json",
        "_score" : 1.0,
        "_source" : {
          "property_id" : "8bf6314b4039493ea55a6ab25d7960717a607089",

*/

async function viewList() {

    let htmlSegment = '';
    htmlSegment += `
    <header class="boarder-top-red">

        <a href="?">
          <div>

          <i class="fa fa-home icon"
            style="
               margin-top: 2px;
               color: #ff0037;
               font-size: 30px;
          "></i>

          </div>
        </a>

    </header>

    <main>

    `;

    const opensearch_data =
    {
      "query": {
        "match_all": {}
      }
    }

    const url = origin + "/property-lister/_search";

    const headers = {};
    headers['Authorization'] = 'Basic ' + base64;
    headers['Content-Type'] = 'application/json';

    const post = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(opensearch_data)
    })
    .then(getResponse)
    .catch(err => document.write('Request Failed ', err));

    const response = await post.json();

    const hits = JSON.parse(JSON.stringify(response['hits']['hits']));

    const response_took = JSON.parse(JSON.stringify(response['took'])); // these are milliseconds

    const hits_total_value    = JSON.parse(JSON.stringify(response['hits']['total'].value));
    const hits_total_relation = JSON.parse(JSON.stringify(response['hits']['total'].relation));

    htmlSegment += `
    <div>
    <p>
        hits: ${hits_total_relation} ${hits_total_value} (display: 1-??) took: ${response_took} milliseconds
    </p>
    </div>
    `;


    for (let hit in hits) {

        let _id               = hits[hit]['_id'];
        console.log(_id);

        let property_id       = hits[hit]['_source'].property_id;
        let street_address    = hits[hit]['_source'].street_address;
        let city              = hits[hit]['_source'].city;
        let state_or_province = hits[hit]['_source'].state_or_province;
        let postal_code       = hits[hit]['_source'].postal_code;

        //const doc = String(property_id);

        //console.log(property_id);

        // property_id + .json

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Identifier_after_number
        // var can not start with a number
        // You will need to rename your variable to avoid the leading number.
        /*

var 1life = 'foo';
// SyntaxError: identifier starts immediately after numeric literal

var foo = 1life;
// SyntaxError: identifier starts immediately after numeric literal

        */

        htmlSegment += `
        <div>
          <details>

              <summary>
                  ${street_address} ${city} ${state_or_province} ${postal_code} 
            
                  <button type="button" onclick="deleteDoc('${_id}')">Delete</button>
                  <button type="button" onclick="">Edit</button>

              </summary>

              <p>
        `;

        for (let item in hits[hit]['_source']){
        
            let value = hits[hit]['_source'][item];

            /*
            if (value !== null) {
             //console.log(item);
             //console.log(value);
             htmlSegment += ` ${item}: ${value} <br>`;
            }
            */

            htmlSegment += ` ${item}: ${value} <br>`;

        } //end for hits

        htmlSegment += `
              </p>
          </details>
        </div>

        </main>
        <footer></footer>
        `;

    } //end for


    container.innerHTML = htmlSegment ;

    history.pushState({page: 'list'}, "list", "?view=list");
}



// property_id = street_address + city + county + state_or_province + postal_code + unit_number
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);             // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}


function viewInfo() {

    let html = '';

    html += `
    <header class="boarder-top-red">

        <a href="?">
          <div>

          <i class="fa fa-home"
            style="
               margin-top: 2px;
               color: #ff0037;
               font-size: 30px;
          "></i>

          </div>
        </a>

    </header>
    <main>
    <div>
    `;


    for (const a in localStorage) {
        //console.log(a, ' = ', localStorage[a]);
        html += '<div>' + a + '<input type="text" value="'+ localStorage[a] +'" disabled ></div>';
    }


    html += `
    </div>
    <div>
            <button type="button" onclick="return addLocalStore();">Add Item</button>
            <button type="button" onclick="localStorage.clear();location.reload();">Clear Storage</button>
            <button type="button" onclick="return Login();">Login</button>
            <button type="button" onclick="return Logout();">Logout</button>
    </div>
    <div>
      <p>${version}</p>
    </div>
    </main>
    <footer></footer>
    `;

    container.innerHTML = html;

    history.pushState({page: 'info'}, "info", "?view=info");
}

//-----------------------------------------------------------

window.deleteDoc = deleteDoc;
async function deleteDoc(doc) {

    const url = origin + '/property-lister/_doc/' + doc ;

    console.log('doc is ' + doc);

/*
    const options = {};

    headers['Content-Type'] = 'application/json';
    options['Authorization'] = 'Basic ' + base64;

    const response = await fetch(url, {
        method:'DELETE', 
        headers: options
    })
    .then(getResponse)
    .catch(err => document.write('Request Failed ', err));
    let html = '';

    if ( ! response.ok) {
        const json = await response.json();
        html += JSON.stringify(json);
        container.innerHTML = html;

        //history.pushState({page: db + table + id +'deleted'}, db + table + id, "?db=" + db + "&table=" + table + "&id=" + id + "&deleted=False");
        history.pushState({page: doc +':deleted:false'}, doc + ':deleted:false', "?view=list&doc=" + doc + "&deleted=False");
    }

*/
    //const json = await response.json();
    //html = JSON.stringify(json);
    //console.log(response.ok);
    //html += '<hr><a href="?db='+db+'&table='+table+'">db.table</a>';
    //document.title = db +' '+ table +' '+ id + 'deleted';

console.log('well well delete');

    history.pushState({page: 'list:deleted' + doc}, 'list:deleted:' + doc, "?view=list&_id=" + doc + "&deleted=True");
    //location.replace('?view=list');
}



//-----------------------------------------------------------


// var currentLocation = window.location;
// <protocol>//<hostname>:<port>/<pathname><search><hash>
const href = new URL(location.href);
const search = new URLSearchParams(location.search);
const hash = window.location.hash;
const view = search.get('view');


function router() {

    if (search.has('logout')) {
        return Logout();
    }

    if (search.has('login')) {
        return Login();
    }

    if (search.has('view')) {

        if (view === 'info') {
            return viewInfo();
        }

        if (view === 'home') {
            return viewHome();
        }

        if (view === 'submit') {
            return viewSubmit();
        }

        if (view === 'list') {
            return viewList();
        }

        if (view === 'photo') {
            return viewPhoto();
        }

        if (view === 'welcome') {
            return viewWelcome();
        }

        /*
        if (hash === '#welcome') {
            return viewWelcome();
        }
        */

    }

    /*
    if ( ! localStorage.getItem('base64') ) {
      return Login();
    }
    */

    return viewHome();
}

/*

?view=home
?view=welcome
?view=submit
?view=list
?view=photo
?view=info
?logout


*/

//-----------------------------------------------------------

/*
window.addEventListener('popstate', function(event) {
    console.log('event popstate activated');
    history.go(-1);
});

window.addEventListener('hashchange', function(event) {
  console.log('hashchange');
});
*/

//-----------------------------------------------------------
/*
<div id="container">
<header>
</header>

<main>
</main>

<footer>
</footer>
</div>
*/

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure

/* this is the layout */

/*
const TopHTML = `
<header></header>
<main>
`;

// main <main></main> in the middle

const BottomHTML = `
</main>
<footer></footer>
`;
                    //<div class="overlay"></div>
         //style="background-image: url(https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80);
         //       background-position: center;
         //       background-size: cover;">
*/

const submitButtonHTML = `
    <div class="hexagon-item">
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <a href="?" class="hex-content">
            <span class="hex-content-inner">
                <span class="icon">
                    <i class="fa fa-bullseye"></i>
                </span>
                <span class="title">Submit</span>
            </span>
            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
            </svg>
        </a>
    </div>
`;



const backButtonHTML = `
    <div class="hexagon-item">
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <a href="?" class="hex-content">
            <span class="hex-content-inner">
                <span class="icon">
                    <i class="fa fa-house"></i>
                </span>
                <span class="title">Home</span>
            </span>
            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
            </svg>
        </a>
    </div>
`;


const homeHTML = `
<header><div class="boarder-top-red"></div></header>
<main>
  <div class="centered">

                            <div>

                                <div class="hexagon-menu clear">

                                    <!-- menu item 1 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?view=welcome"  class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-universal-access"></i>
                                                </span>
                                                <span class="title">Welcome</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item 2 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?view=submit" class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-bullseye"></i>
                                                </span>
                                                <span class="title">Submit Listing</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item 3 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?view=list" class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-clipboard"></i>
                                                </span>
                                                <span class="title">View Listings</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item 4 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?view=photo" class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-camera"></i>
                                                </span>
                                                <span class="title">Photo</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item 5 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?view=info" class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-lightbulb"></i>
                                                </span>
                                                <span class="title">Info</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item 6 -->

                                    <div class="hexagon-item">
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="hex-item">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <a href="?logout" class="hex-content">
                                            <span class="hex-content-inner">
                                                <span class="icon">
                                                    <i class="fa fa-arrow-right-from-bracket"></i>
                                                </span>
                                                <span class="title">Logout</span>
                                            </span>
                                            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
                                            </svg>
                                        </a>
                                    </div>

                                    <!-- menu item ? -->


                                </div>

                            </div>

  </div>
</main>
<footer></footer>
`;

//-----------------------------------------------------------

const welcomeHTML = `
<header><div class="boarder-top-red"></div></header>
<nav>
<div class="transform-scale">
    <div class="hexagon-item">
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="hex-item">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <a href="?" class="hex-content">
            <span class="hex-content-inner">
                <span class="icon">
                    <i class="fa fa-house"></i>
                </span>
                <span class="title">Home</span>
            </span>
            <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z" fill="#1e2530"></path>
            </svg>
        </a>
    </div>
</div>
</nav>
<main>

<br>
Welcome to this page!
<br>
<br>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br> 
<br> 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<br>
<br>
<a href="https://en.wikipedia.org/wiki/Lorem_ipsum" target="_blank"> https://en.wikipedia.org/wiki/Lorem_ipsum </a>

</main>
<footer></footer>
`;

let run = router();

const done = performance.now() - start;

console.log(version + ' ' + done);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// import declarations may only appear at top level of a module
// <script type="module" src="script.js"></script>

