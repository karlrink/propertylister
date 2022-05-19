
const version = '🌎 property lister 2022-05-18 v3';

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
          div { text-align: center;
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

        document.title = 'PropertyLister: Home';

        let htmlSegment = `
        `;

        html = TopHTML + htmlSegment + BottomHTML;

        history.pushState({page: 'home'}, "home", "?view=home");
    }

    container.innerHTML = html;

    //history.pushState({page: 'home'}, "home", "?view=home");
}


function viewSubmit() {

    document.title = 'PropertyLister: Submit';

    let html = '';
    html += `

    <div>

    <form id="form" onsubmit="submitForm(event)">

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
      <button type="submit">Submit</button>

      <hr>


      <label for="description">description:</label>
      <input type="text" id="description" name="description" placeholder="description (Optional)">
      <br>

      <label for="description">bedrooms:</label>
      <input type="text" id="bedrooms" name="bedrooms" placeholder="bedrooms (Optional)">
      <br>

      <br>

    </form>

    </div>

    <div id="form-output"></div>

    `;

    container.innerHTML = TopHTML + html + BottomHTML;

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
      "description": null,
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

}

/*
POST  property-lister/_search
{
  "query": {
    "match_all": {}
  }
}
*/

async function viewList() {

    let htmlSegment = '';
    htmlSegment += `
    <div>
    View List
    </div>
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

        let property_id       = hits[hit]['_source'].property_id;
        let street_address    = hits[hit]['_source'].street_address;
        let city              = hits[hit]['_source'].city;
        let state_or_province = hits[hit]['_source'].state_or_province;
        let postal_code       = hits[hit]['_source'].postal_code;


        htmlSegment += `
        <div>
          <details>
              <summary>
                  ${street_address} ${city} ${state_or_province} ${postal_code}
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
        `;

    } //end for


    container.innerHTML = TopHTML + htmlSegment + BottomHTML;

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
    `;

    container.innerHTML = TopHTML + html + BottomHTML;

    history.pushState({page: 'info'}, "info", "?view=info");
}

//-----------------------------------------------------------

//const location_href = new URL(location.href);
const params = new URLSearchParams(location.search);
const view = params.get('view');

function router() {

    if (params.has('logout')) {
        return Logout();
    }

    if (params.has('login')) {
        return Login();
    }

    if (params.has('view')) {

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

    }

    /*
    if ( ! localStorage.getItem('base64') ) {
      return Login();
    }
    */

    return viewHome();
}

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

/* this is the layout */

const TopHTML = `
<header class="page-header"></header>
<nav class="menu">
  <ul class="menu_content">
    <li class="menu_item" ><a class="menu_link" href="?">Home</a></li>
    <li class="menu_item" ><a class="menu_link" href="?view=submit">Submit Listing</a></li>
    <li class="menu_item" ><a class="menu_link" href="?view=list">Listings</a></li>
    <li class="menu_item" ><a class="menu_link" href="?view=info">Info</a></li>
  </ul>
</nav>
<main class="page-body">
`;

// main <main></main> in the middle

const BottomHTML = `
</main>
<footer class="page-footer"></footer>
`;


//-----------------------------------------------------------

let run = router();

const done = performance.now() - start;

console.log(version + ' ' + done);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// import declarations may only appear at top level of a module
// <script type="module" src="script.js"></script>

