// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

const $btn = $('#btn')
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
let cats = [];
async function getCategoryIds() {
    
    
   for (let i = 0; i < 6; i++){
        const res = await axios.get('http://jservice.io/api/random');
       await cats.push(res.data[0].category_id)
       
   }
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const res =  await axios.get(`https://jservice.io/api/category?id=${catId}`)
    
    return res
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    const $htmlBody = $('#body');
    const $table = $('<table id="table" class = "table"></table>');
    let $tHead = $('<thead></thead>');
    let $tr = $('<tr></tr>');
    for ( let i = 0; i < 6; i++){
        $tr.append($('<th></th>').text(categories[i].data.title));
    }
    $tHead.append($tr);   

    let $tBody = $('<tbody></tbody>');
    for(let y = 0; y < 5; y++){
        let $tr = $('<tr></tr>');
        for(let x = 0; x < 6; x++){
            $tr.append($('<td></td>').attr('id', `${x}-${y}`).text('?'))
        }
        $tBody.append($tr);
    }
    $table.append($tHead);
    $table.append($tBody);
    $htmlBody.append($table);
}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
 let id = evt.target.id;
 let [y,x] = id.split("-")
 let clue = categories[y].data.clues[x]
 console.log(clue);
 if($(evt.target).text()=="?"){
    $(evt.target).text(`${clue.question}`)
 }
 else if($(evt.target).text()==clue.question){
    $(evt.target).text(`${clue.answer}`)
 }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    console.log('yo')
    $('#table').remove();
    $('#restart').hide();
    $btn.show();
    cats = [];
    categories = [];
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
const $restart = $('<button id="restart">Restart</button>');
$restart.on('click',showLoadingView)
async function setupAndStart() {
    getCategoryIds()
    

   setTimeout(async function (){
     for(let id of cats){
        categories.push(await getCategory(id))
        }
        fillTable()
   },3500);
    
$btn.hide();

$('#body').append($restart);

}

/** On click of start / restart button, set up game. */

$btn.on('click',function(e){
    e.preventDefault();
    setupAndStart()
    $('#restart').show();
})
// TODO

/** On page load, add event handler for clicking clues */
$(document).ready(function() {
    console.log('rad');
     $('#body').on('click','#table td',handleClick);
})
   


// TODO