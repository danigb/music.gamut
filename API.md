# API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="ascending"><span class="type-signature"></span>ascending<span class="signature">(gamut)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get ascending gamut: remove nulls, duplications and sort by pitch (freq)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>gamut</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the gamut</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js#L105">lineno 105</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the ascending gamut</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>gamut.ascending('E e D c') // => ['C', 'D', 'E']</code></pre>
</dd>
<dt>
<h4 class="name" id="distances"><span class="type-signature"></span>distances<span class="signature">(tonic, source)</span><span class="type-signature"> &rarr; {Array.&lt;String>}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the distances (in intervals) of the notes from a tonic</p>
<p><strong>Important</strong>: al pitch classes are converted to octave 0 before calculating
the distances.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>tonic</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the note to calculate the interval from</p></td>
</tr>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
|
<span class="param-type">Array.&lt;Array></span>
</td>
<td class="description last"><p>the notes</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js#L77">lineno 77</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the intervals</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array.&lt;String></span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>gamut.distance('D2', 'D2 E2 F2') // => ['1P', '2M', '3m']
// pitch classes are octave 0
gamut.distance('C', 'C2') // => ['15P']
gamut.distance('C2', 'C') // => ['-15P']</code></pre>
</dd>
<dt>
<h4 class="name" id="gamut"><span class="type-signature"></span>gamut<span class="signature">(source, transform)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a gamut: create an array of notes or intervals from a source.
The source can be a string with items separated by
spaces, commas or bars (<code>|</code>), an array or an object.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
|
<span class="param-type">Object</span>
</td>
<td class="description last"><p>the source</p></td>
</tr>
<tr>
<td class="name"><code>transform</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>(Optional) a function that transforms the gamut</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js#L17">lineno 17</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the source converted to an array (never null)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>gamut('cb d3 e') // => [ 'Cb', 'D3', 'E' ]</code></pre>
</dd>
<dt>
<h4 class="name" id="transpose"><span class="type-signature"></span>transpose<span class="signature">(interval, source)</span><span class="type-signature"> &rarr; {Array.&lt;Integer>}</span></h4>
</dt>
<dd>
<div class="description">
<p>Transpose a list of notes by an interval</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the interval to transpose</p></td>
</tr>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
|
<span class="param-type">Array.&lt;Array></span>
</td>
<td class="description last"><p>the gamut</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.gamut/blob/master/index.js#L57">lineno 57</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the transposed notes</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array.&lt;Integer></span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->
