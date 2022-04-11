<template>

	<hooper :itemsToShow="3" :infiniteScroll="true">
    <slide>
      <b-card
				style="max-width: 20rem;"
				class="mb-2 card-cartoons"
			>
				<b-card-text>
					<table class="bingoBoard" cellspacing="10" cellpadding="5">
						<tr>
								<th>B</th>
								<th>I</th>
								<th>N</th>
								<th>G</th>
								<th>O</th>
						</tr>
						<tr class="first_line">
								<td>01</td>
								<td>02</td>
								<td>03</td>
								<td>04</td>
								<td>05</td>
						</tr>
						<tr>
								<td>06</td>
								<td>07</td>
								<td>08</td>
								<td>09</td>
								<td>10</td>
						</tr>
						<tr>
								<td>11</td>
								<td>12</td>
								<td>15</td>
								<td>13</td>
								<td>14</td>
						</tr>
						<tr>
								<td>15</td>
								<td>16</td>
								<td>17</td>
								<td>18</td>
								<td>19</td>
						</tr>
						<tr>
								<td>20</td>
								<td>21</td>
								<td>22</td>
								<td>23</td>
								<td>24</td>
						</tr>
					</table>
					
				</b-card-text>

			</b-card>
			asasas
    </slide>
    <slide>
       <b-card
				style="max-width: 20rem;"
				class="mb-2 card-cartoons"
			>
				<b-card-text>
					<table class="bingoBoard" cellspacing="10" cellpadding="5">
						<tr>
								<th>B</th>
								<th>I</th>
								<th>N</th>
								<th>G</th>
								<th>O</th>
						</tr>
						<tr class="first_line">
								<td>01</td>
								<td>02</td>
								<td>03</td>
								<td>04</td>
								<td>05</td>
						</tr>
						<tr>
								<td>06</td>
								<td>07</td>
								<td>08</td>
								<td>09</td>
								<td>10</td>
						</tr>
						<tr>
								<td>11</td>
								<td>12</td>
								<td>15</td>
								<td>13</td>
								<td>14</td>
						</tr>
						<tr>
								<td>15</td>
								<td>16</td>
								<td>17</td>
								<td>18</td>
								<td>19</td>
						</tr>
						<tr>
								<td>20</td>
								<td>21</td>
								<td>22</td>
								<td>23</td>
								<td>24</td>
						</tr>
					</table>
				</b-card-text>

			</b-card>
    </slide>
		<slide>
       <b-card
				style="max-width: 20rem;"
				class="mb-2 card-cartoons"
			>
				<b-card-text>
					<table class="bingoBoard" cellspacing="10" cellpadding="5">
						<tr>
								<th>B</th>
								<th>I</th>
								<th>N</th>
								<th>G</th>
								<th>O</th>
						</tr>
						<tr class="first_line">
								<td>01</td>
								<td>02</td>
								<td>03</td>
								<td>04</td>
								<td>05</td>
						</tr>
						<tr>
								<td>06</td>
								<td>07</td>
								<td>08</td>
								<td>09</td>
								<td>10</td>
						</tr>
						<tr>
								<td>11</td>
								<td>12</td>
								<td>15</td>
								<td>13</td>
								<td>14</td>
						</tr>
						<tr>
								<td>15</td>
								<td>16</td>
								<td>17</td>
								<td>18</td>
								<td>19</td>
						</tr>
						<tr>
								<td>20</td>
								<td>21</td>
								<td>22</td>
								<td>23</td>
								<td>24</td>
						</tr>
					</table>
				</b-card-text>

			</b-card>
    </slide>
  </hooper>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'App',
  components: {
    Hooper,
    Slide
  }
};
</script>

<style>
.hooper {
  height: 100%;
}
.card-cartoons {
	/*background-image: url('../assets/images/bg-cartones.jpg');
	background-size: cover;*/
	background-color: #000;
	border: 4px solid #66623f;
	border-radius: 5px;
	margin: 3px;
}

.bingoBoard {
  font-size: 20px;
  background-color: transparent;
	font-family: "Arial", "sans-serif";
}

.bingoBoard tr td, .bingoBoard tr th {
	background-size: 2px 2px;
	padding: 16px;
	border: 1px solid #66623f;
	color: #cdcdcb;
}

.bingoBoard tr th {
	border: none;
	text-align: center;
}

.bingoBoard tr.first_line td {
 	border-top: none;
}

.bingoBoard tr td:nth-child(1) {
 	border-left: none;
}

.bingoBoard tr td:nth-child(5) {
 	border-right: none;
}

.bingoBoard tr td:nth-last-child(n){
	border-bottom: none;
}

.bingoBoard tr th {
  font-weight: 900;
  font-size: 35px;
  color: #949494;
}

.bingoBoard tr td {
  font-weight: bold;
  cursor: pointer;
  -webkit-transition: all 1s;
}
</style>