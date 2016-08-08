'use strict';
import 'index.css';
import $ from 'jquery';

$('<h1>This is Test</h1>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');
const cats = ['webpack', 'babel', 'react'];

for (const cat of cats) {
    $('<li></li>').text(cat).appendTo(ul);
}