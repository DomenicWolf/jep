let $thead;
let $htmlbody = $(body)
let $tbody;
let $indexTr;
async function fillTable() {
    
    const $headTr =$('<tr id="headTr"></tr>')
    //const $bodyTr = $(' <tr id="bodyrow"></tr>')
     $tbody = $(`<tbody id="tbody"></tbody>`)
    

     for(let i = 0; i < 5; i++){
         $indexTr = $(`<tr class="${i}"></tr>`)
        $tbody.append($indexTr);
     }
     for(let [i,cat] of cats.entries()){
        let id = await getCategory(cat)
        let clues = id.data.clues;
        let $td = $(`<td>${id.data.title}</td>`);
        $($headTr).append($td)
        
        
        for (let x = 0; x < 6; x++) {
            //let $bodyTr = $(`<tr class="${[i]}-${x}"></tr>`);
            let r = Math.floor(Math.random() * clues.length);
            let $test = $('<div class="test">?</div>').show();
            let $question = $(`<div class="question">${clues[r].question}</div>`).hide();
            let $answer = $(`<div class="answer">${clues[r].answer}</div>`).hide();
            let $bodyTd = $(`<td class="${[i]}-${x}"></td>`).append($test, $question, $answer);
            //$bodyTr.append($bodyTd);
           // $tbody.append($bodyTr);
            let $index = $(`.${i}`);
            let $catTd = $indexTr.find(`td:eq(${x})`)
           $catTd.append($bodyTd)
            $($indexTr).append($bodyTd)
        }
         
         $tbody.append($indexTr);
    }
    
    $thead = $(`
            <table id="table">
                <thead id="head">
                   
                </thead>
            </table>
        `)
   
   // $tbody.append($bodyTr);
    $thead.find('#head').append($headTr)
    $thead.append($tbody);
    $htmlbody.append($thead)

    
}













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
let $thead;
let $htmlbody = $(body)
let $tbody;
let $indexTr;
async function fillTable() {
    
    const $headTr =$('<tr id="headTr"></tr>')
    const $tbody = $(`<tbody id="tbody"></tbody>`)
    const id = await getCategory(cat);

    for(let i = 0; i < 5; i++){
        const $indexTr = $(`<tr class="${i}"></tr>`)
        $tbody.append($indexTr);
        for (let x = 0; x < 6; x++) {
            const $catTd = $('<td></td>');
            const $answerTd = $('<td></td>');
            $indexTr.append($catTd, $answerTd);
            
            const cat = cats[i];
            
            const clues = id.data.clues;
            const r = Math.floor(Math.random() * clues.length);
            
            const $test = $('<div class="test">?</div>').show();
            const $question = $(`<div class="question">${clues[r].question}</div>`).hide();
            const $answer = $(`<div class="answer">${clues[r].answer}</div>`).hide();
            const $bodyTd = $('<td></td>').append($test, $question, $answer);
            
            $answerTd.append($bodyTd);
        }
        
        const $td = $(`<td>${id.data.title}</td>`);
        $catTd.append($td);
        $($headTr).append($catTd);
    }
    
    const $thead = $(`
        <table id="table">
            <thead id="head">
            </thead>
        </table>
    `)
   
    $thead.find('#head').append($headTr);
    $thead.append($tbody);
    $htmlbody.append($thead);
}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let click = evt.target.classList;
    //let $test = $('<td>?</td>')
    //evt.target.innerText = ''
    console.log($(evt.target).text())
    if($(evt.target).children('.test').is(':visible')){
        $(evt.target).children('.test').hide()
        $(evt.target).children('.question').show()
        $(evt.target).children('.answer').hide()
    }
    else {
        $(evt.target).children('.question').hide();
        $(evt.target).children('.answer').show()
     }
     //else if($(evt.target).children('.question').is(':visible')){
        //console.log('Hiding question');
           // $(evt.target).children('.question').hide();
           // $(evt.target).children('.answer').show()

   // }
    
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

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

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */
$(document).ready(function() {
    console.log('rad');
     $('#body').on('click','#table td',handleClick);
})
   


// TODO