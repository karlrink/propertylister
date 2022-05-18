
const version = '🌎 property lister 2022-05-18 v0';

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

// property_id
// sale_type
// property_record_type

// amount
// street_address
// city
// county
// state_or_province
// postal_code

// latitude
// longitude

// bedrooms
// baths_total
// description
// features
// picture_data_source_url
// living_area_square_feet
// living_area
// lot_size
// hoa_fee
// parking
// year_built
// school_district
// elementary_school
// middle_school
// high_school
// foundation
// room_list
// appliances
// floor_covering
// roof_type
// view_type
// fips
// condition
// stories
// total_units
// total_rooms
// family_room
// living_room
// den
// kitchen
// basement
// heating
// cooling
// trust_deed_document_number
// nod_date_defaulted_lien
// nod_doc_number_defaulted_lien
// nod_date_default
// nod_amount_default
// nod_recording_date
// nod_recording_year
// nod_document_number
// auction_date
// auction_time
// nots_trustee_sale_number
// nots_auction_title
// nots_auction_address
// nots_auction_city
// nots_auction_state
// nots_auction_zip
// ...

// reo_document_number
// judgment_amount
// legal_description
// zoning
// lis_pendens_index_no
// ...




function viewSubmit() {

    document.title = 'PropertyLister: Submit';

    let html = '';
    html += `

    <div>

    <form id="form" onsubmit="submitForm(event)">

      <label for="amount">amount:</label>
      <input type="text" id="amount" name="amount" placeholder="$1.00">
      <br>

      <label for="street_address">street_address:</label>
      <input type="text" id="street_address" name="street_address" placeholder="22718 Haynes Street">
      <br>

      <label for="city">city:</label>
      <input type="text" id="city" name="city" placeholder="West Hills">
      <br>

      <label for="county">county:</label>
      <input type="text" id="county" name="county" placeholder="Los Angeles">
      <br>

      <label for="state_or_province">state_or_province:</label>
      <input type="text" id="state_or_province" name="state_or_province" placeholder="CA">
      <br>

      <label for="postal_code">postal_code:</label>
      <input type="text" id="postal_code" name="postal_code" placeholder="91307">
      <br>

      <button type="submit">Submit</button>
    </form>

    </div>

    `;

    container.innerHTML = TopHTML + html + BottomHTML;

    const form = document.getElementById('form');

    history.pushState({page: 'submit'}, "submit", "?view=submit");
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

