function binlinCreate() {
    let rows = +document.querySelector("#binlinRows").value;
    let cols = +document.querySelector("#binlinCols").value;

    let genMat = document.querySelector("#binlinGen");
    genMat.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let tableRow = genMat.insertRow();
        for (let c = 0; c < cols; c++) {
            let tableCell = tableRow.insertCell();
            tableCell.innerHTML = "<input></input>";
        }
    }

    document.querySelector("#binlinGenDiv").hidden = false;
}

function binlinCalculate() {
    let rows = +document.querySelector("#binlinRows").value;
    let cols = +document.querySelector("#binlinCols").value;

    let genMatRows = document.querySelectorAll("#binlinGen tr");

    let genMat = [];

    for (let row of genMatRows) {
        let matRow = [];
        for (let cell of row.cells) {
            matRow.push(+cell.firstChild.value);
        }
        genMat.push(matRow);
    }

    document.querySelector("#binlinResultDiv").hidden = false;

    let n = cols;
    let k = rows;
    document.querySelector("#binlinN").value = n;
    document.querySelector("#binlinK").value = k;

    let parMat = document.querySelector("#binlinParMat");
    parMat.innerHTML = "";
    for (let r = 0; r < n - k; r++) {
        let tableRow = parMat.insertRow();
        for (let c = 0; c < k; c++) {
            let tableCell = tableRow.insertCell();
            let value = genMat[c][n - k + r - 1];
            tableCell.innerHTML = "<input readonly value='" + value + "' />"
        }
        for (let c = 0; c < n - k; c++) {
            let tableCell = tableRow.insertCell();
            let value = c == r ? '1' : '0';
            tableCell.innerHTML = "<input readonly value='" + value + "' />"
        }
    }

    let codewords = [];
    codewords.push("0".repeat(n));
    for (let i = 0; i < k; i++) {
        let codeword = "";
        for (let j = 0; j < n; j++) {
            codeword += genMat[i][j];
        }
        codewords.push(codeword);
    }

    let codeword = "";
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < k; j++) {
            sum += +codewords[j + 1][i];
        }
        sum %= 2;
        codeword += sum;
    }
    codewords.push(codeword);

    let codewordTable = document.querySelector("#binlinCodewords");
    codewordTable.innerHTML = "";

    for (let cw of codewords) {
        codewordTable.insertRow().insertCell().innerHTML = "<input readonly value='" + cw + "' />";
    }

    document.querySelector("#binlinErrorVecDiv").hidden = false;
}

function binlinCalcEV() {
    let parMat = document.querySelector("#binlinParMat");
    let errorVec = document.querySelector("#binlinErrorVec").value;
    let codewords = document.querySelectorAll("#binlinCodewords input")
    let k = +document.querySelector("#binlinRows").value;
    let n = +document.querySelector("#binlinCols").value;

    let syndromeVec = "";
    for (let i = 0; i < parMat.rows.length; i++) {
        let val = 0;
        for (let j = 0; j < n; j++) {
            val += +errorVec[j] * +parMat.rows[i].cells[j].firstChild.value;
        }
        val %= 2;
        syndromeVec += val;
    }
    document.querySelector("#binlinSyndrome").value = syndromeVec;

    document.querySelector("#binlinEVResultDiv").hidden = false;

    let codewordAnalyzed = document.querySelector("#binlinCWAnalyzed");

    let headerRow = codewordAnalyzed.insertRow(0);
    headerRow.insertCell();
    headerRow.insertCell().innerHTML = "<b>Lehet vezető</b>";
    headerRow.insertCell().innerHTML = "<b>súly</b>";

    for (let i = 0; i < codewords.length; i++) {
        let newVec = "";
        for (let j = 0; j < n; j++) {
            newVec += (+errorVec[j] + +codewords[i].value[j]) % 2;
        }

        let headerRow = codewordAnalyzed.insertRow();
        headerRow.insertCell().innerHTML = newVec;
    }

    let minWeight = n;
    for (let i = 0; i < codewords.length; i++) {
        let code = codewordAnalyzed.rows[i + 1].cells[0].innerHTML;
        let weight = code.split('1').length - 1;
        if (weight < minWeight) {
            minWeight = weight;
        }
    }

    for (let i = 0; i < codewords.length; i++) {
        let code = codewordAnalyzed.rows[i + 1].cells[0].innerHTML;
        let weight = code.split('1').length - 1;
        let tableRow = codewordAnalyzed.rows[i + 1];
        tableRow.insertCell().innerHTML = weight == minWeight ? 'igen' : ' ';
        tableRow.insertCell().innerHTML = weight;
    }
}

function systematicGen() {
    let count = +document.querySelector("#systematicCount").value;
    
    let codewordTable = document.querySelector("#systematicCodewords");

    codewordTable.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let tableCell = codewordTable.insertRow(i).insertCell(0);
        tableCell.innerHTML = "<input></input>";
    }

    document.querySelector("#systematicCW").hidden = false;
}

function systematicCalculate() {
    let count = +document.querySelector("#systematicCount").value;
    
    let k = Math.log2(count);

    let codewords = document.querySelectorAll("#systematicCodewords input");
    let genMatTable = document.querySelector("#systematicGenMat");
    genMatTable.innerHTML = "";

    let n = codewords.item(0).value.length;

    for (let r = 0; r < k; r++) {
        let tableRow = genMatTable.insertRow(r);
        for (let c = 0; c < count; c++) {
            let code = codewords.item(c).value;
            let matches = true;
            for (let i = 0; i < k; i++) {
                if (code[i] != (i == r ? '1' : '0')) {
                    matches = false;
                    break;
                }
            }
            if (!matches) {
                continue;
            }

            for (let i = 0; i < code.length; i++) {
                let tableCell = tableRow.insertCell(i);
                tableCell.innerHTML = "<input readonly value=\"" + code[i] + "\"></input>";
            }
            break;
        }
    }

    let parMatTable = document.querySelector("#systematicParMat");
    parMatTable.innerHTML = "";

    for (let r = 0; r < n - k; r++) {
        let tableRow = parMatTable.insertRow(r);
        for (let c = 0; c < k; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = genMatTable.rows[c].cells[r + k].firstChild.value;
            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"
        }

        for (let c = k; c < n; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = c - k == r ? 1 : 0;
            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"
        }
    }

    document.querySelector("#systematicMats").hidden = false;
}

function systematicCalcEV() {
    let errorVector = document.querySelector("#systematicEV").value;
    let parMatTable = document.querySelector("#systematicParMat");

    let n = errorVector.length;

    let syndromeVec = "";
    for (let i = 0; i < parMatTable.rows.length; i++) {
        let val = 0;
        for (let j = 0; j < n; j++) {
            val += +errorVector[j] * +parMatTable.rows[i].cells[j].firstChild.value;
        }
        val %= 2;
        syndromeVec += val;
    }
    document.querySelector("#systematicSV").value = syndromeVec;

    let errorRate = +document.querySelector("#systematicErrorRate").value;

    let codewordAnalyzed = document.querySelector("#systematicCWAnalyzed");
    let codewords = document.querySelectorAll("#systematicCodewords input")

    let headerRow = codewordAnalyzed.insertRow(0);
    headerRow.insertCell();
    headerRow.insertCell().innerHTML = "<b>Lehet vezető</b>";
    headerRow.insertCell().innerHTML = "<b>súly</b>";
    headerRow.insertCell().innerHTML = "<b>valószínűség</b>";

    for (let i = 0; i < codewords.length; i++) {
        let newVec = "";
        for (let j = 0; j < n; j++) {
            newVec += (+errorVector[j] + +codewords[i].value[j]) % 2;
        }

        let headerRow = codewordAnalyzed.insertRow();
        headerRow.insertCell().innerHTML = newVec;
    }

    let minWeight = n;
    for (let i = 0; i < codewords.length; i++) {
        let code = codewordAnalyzed.rows[i + 1].cells[0].innerHTML;
        let weight = code.split('1').length - 1;
        if (weight < minWeight) {
            minWeight = weight;
        }
    }

    for (let i = 0; i < codewords.length; i++) {
        let code = codewordAnalyzed.rows[i + 1].cells[0].innerHTML;
        let weight = code.split('1').length - 1;
        let tableRow = codewordAnalyzed.rows[i + 1];
        tableRow.insertCell().innerHTML = weight == minWeight ? 'igen' : ' ';
        tableRow.insertCell().innerHTML = weight;
        tableRow.insertCell().innerHTML = Math.pow(errorRate, weight) 
            * Math.pow(1 - errorRate, n - weight);
    }
}

function hammingGenMats() {
    let n = +document.querySelector("#hammingN").value;
    let k = +document.querySelector("#hammingK").value;

    let parMatTable = document.querySelector("#hammingParMat");
    parMatTable.innerHTML = "";

    for (let r = 0; r < n - k; r++) {
        let tableRow = parMatTable.insertRow(r);
        let curNum = 3;
        for (let c = 0; c < k; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = (Math.floor(curNum  / Math.pow(2, r))) % 2;

            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"

            curNum += 1;
            if (Math.floor(Math.log2(curNum)) == Math.log2(curNum)) {
                curNum += 1;
            }
        }

        for (let c = k; c < n; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = c - k == r ? 1 : 0;

            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"
        }
    }

    let genMatTable = document.querySelector("#hammingGenMat");
    genMatTable.innerHTML = "";

    for (let r = 0; r < k; r++) {
        let tableRow = genMatTable.insertRow(r);
        for (let c = 0; c < k; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = c == r ? 1 : 0;

            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"
        }

        for (let c = 0; c < n - k; c++) {
            let tableCell = tableRow.insertCell(c + k);
            let value = parMatTable.rows[c].cells[r].firstChild.value;

            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>"
        }
    }

    document.querySelector("#hammingMats").hidden = false;
}

function isPrime(n) {
    if (n % 2 == 0) {
        return false;
    }
    for (let i = 3; i < Math.sqrt(n); i += 2) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

function rsCalc() {
    let modulo = +document.querySelector("#rsModulo").value;
    let errors = +document.querySelector("#rsError").value;
    let primitive = +document.querySelector("#rsPrimitive").value;

    let q = 0;
    for (let i = 2; q < 2 * errors + 2; i++) {
        if (isPrime(i)) {
            q = i;
        }
    }

    let n = q - 1;
    let k = n - 2 * errors;

    document.querySelector("#rsN").value = n;
    document.querySelector("#rsK").value = k;

    let matTable = document.querySelector("#rsGenMat");
    matTable.innerHTML = "";

    for (let row = 0; row < k; row++) {
        let tableRow = matTable.insertRow(row);
        for (let col = 0; col < n; col++) {
            let tableCell = tableRow.insertCell(col);
            tableCell.innerHTML = "<input readonly value=\"" + Math.pow(primitive, row * col) % modulo + "\">";
        }
        tableRow.innerHTML += "<br>";
    }

    let parTable = document.querySelector("#rsParMat");
    parTable.innerHTML = "";
    for (let row = 1; row <= n - k; row++) {
        let tableRow = parTable.insertRow(row - 1);
        for (let col = 0; col < n; col++) {
            let tableCell = tableRow.insertCell(col);
            tableCell.innerHTML = "<input readonly value=\"" + Math.pow(primitive, row * col) % modulo + "\">";
        }
        tableRow.innerHTML += "<br>";
    }

    let inputRow = document.querySelector("#rsInput");
    let outputRow = document.querySelector("#rsOutput");
    inputRow.innerHTML = "";
    outputRow.innerHTML = "";

    for (let i = 0; i < k; i++) {
        let cell = inputRow.insertCell(i);
        cell.innerHTML = "<input></input>"
    }

    for (let i = 0; i < n; i++) {
        let cell = outputRow.insertCell(i);
        cell.innerHTML = "<input readonly></input>"
    }

    document.querySelector("#rsResults").hidden = false;
}

function rsCalcOutput() {
    let genMatrix = [];
    let genMatrixTableRows = document.querySelectorAll("#rsGenMat tr");
    let modulo = +document.querySelector("#rsModulo").value;

    for (let row of genMatrixTableRows) {
        let rowValues = [];
        for (let cell of row.childNodes) {
            if (cell.firstChild == null) {
                continue;
            }
            rowValues.push(+cell.firstChild.value);
        }
        genMatrix.push(rowValues);
    }

    let input = [];
    for (let i of document.querySelectorAll("#rsInput input")) {
        input.push(+i.value);
    }

    let outputRow = document.querySelector("#rsOutput");
    for (let i = 0; i < genMatrix[0].length; i++) {
        let res = 0;
        for (let j = 0; j < input.length; j++) {
            res += input[j] * genMatrix[j][i];
        }
        res %= modulo;

        outputRow.children.item(i).firstChild.value = res;
    }
}

function revRSGen() {
    let rows = +document.querySelector("#revRSRows").value;
    let cols = +document.querySelector("#revRSCols").value;

    let matTable = document.querySelector("#revRSParMat");

    matTable.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        let row = matTable.insertRow(r);
        for (let c = 0; c < cols; c++) {
            let col = row.insertCell(c);
            col.innerHTML = "<input></input>"
        }
    }

    document.querySelector("#revRSResults").hidden = false;
}

function revRSCalcGen() {
    let rows = +document.querySelector("#revRSRows").value;
    let cols = +document.querySelector("#revRSCols").value;

    let n = cols;
    let k = cols - rows;

    let mod = +document.querySelector("#revRSModulo").value;

    let parMatTable = document.querySelector("#revRSParMat");
    
    let lambda = +parMatTable.rows[0].cells[1].firstChild.value;

    let resultTable = document.querySelector("#revRSGenMat");
    resultTable.innerHTML = "";

    for (let r = 0; r < k; r++) {
        let tableRow = resultTable.insertRow(r);
        for (let c = 0; c < n; c++) {
            let tableCell = tableRow.insertCell(c);
            let value = Math.pow(lambda, r * c) % mod;
            tableCell.innerHTML = "<input readonly value=\"" + value + "\"></input>";
        }
    }

    document.querySelector("#revRSDecoded").hidden = false;

    let codevector = document.querySelector("#revRSCodevector");
    codevector.innerHTML = "";

    for (let i = 0; i < n; i++) {
        let cell = codevector.insertCell(i);
        cell.innerHTML = "<input></input>";
    }

    let message = document.querySelector("#revRSMessage");
    message.innerHTML = "";

    for (let i = 0; i < k; i++) {
        let cell = message.insertCell(i);
        cell.innerHTML = "<input readonly></input>";
    }
}

function revRSDecode() {
    let rows = +document.querySelector("#revRSRows").value;
    let cols = +document.querySelector("#revRSCols").value;

    let k = cols - rows;

    let mod = +document.querySelector("#revRSModulo").value;

    let parMatTable = document.querySelector("#revRSParMat");
    
    let lambda = +parMatTable.rows[0].cells[1].firstChild.value;

    let values = Array(k).fill(0);

    let requiredRow = document.querySelectorAll("#revRSCodevector input")

    while (true) {
        let matches = true;
        for (let i = 0; i < k; i++) {
            let value = 0;
            for (let j = 0; j < k; j++) {
                value += (values[j] * Math.pow(lambda, i * j)) % mod;
            }
            value %= mod;
            if (value != +requiredRow.item(i).value) {
                matches = false;
                break;
            }
        }
        if (matches) {
            break;
        }
        for (let i = 0; i < k; i++) {
            values[i]++;
            if (values[i] < mod) {
                break;
            }
            values[i] = 0;
        }
    }

    let resultRow = document.querySelectorAll("#revRSMessage input");

    for (let i = 0; i < k; i++) {
        resultRow.item(i).value = values[i];
    }
}

function lz78encode() {
    codeString = String(document.querySelector("#lz78Input").value);
    
    let out = document.querySelector("#lz78out");
    out.innerHTML = "";
    let szeletelt = "";
    
    String.prototype.paddingLeft = function (paddingValue) {
        return String(paddingValue + this).slice(-paddingValue.length);
    };

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };

    document.querySelector("#lz78out").innerHTML +="<pre>" + "Index".paddingLeft("      ") + "  "+ "Szelet".paddingLeft("       ")+ " (elöző,új)" + "</pre>"  + "<br>";

    let dictionary = new Map(); 
    let j = 0;
    for(var i = 0; i< codeString.length ; i++) {
        let tempString = "";
        tempString += codeString.charAt(i);
        let lastMatch = "";
        while(dictionary.has(tempString) && i < codeString.length) {
            lastMatch = tempString;
            tempString += codeString.charAt(++i);
        }
        var a;
        if(dictionary.has(lastMatch))
            a = dictionary.get(lastMatch);
        else a = -1;

        document.querySelector("#lz78out").innerHTML +="<pre>" + (j+1).toString(2).paddingLeft(" 0000") + "  " + tempString.paddingLeft("      ")+ "     <" + (a + 1).toString(2).paddingLeft(" 0000")+ ", "+ codeString.charAt(i) +">" + "</pre><br>";
        dictionary.set(tempString,j++);
        szeletelt += tempString + " | ";
    }
    document.querySelector("#lz78out").innerHTML += szeletelt;
    document.querySelector("#lz78Results").hidden = false;
}

function cyclicGenerate() {
    let modulo = +document.querySelector("#cyclicMod").value;
    let errors = +document.querySelector("#cyclicErrors").value;
    let primitive = +document.querySelector("#cyclicPrimitive").value;

    let n = modulo - 1;
    let k = n - 2 * errors;

    document.querySelector("#cyclicN").value = n;
    document.querySelector("#cyclicK").value = k;
    
    let genPolynom = document.querySelector("#cyclicGen");

    let values = Array(n - k + 1).fill(0);
    let counter = Array(n - k).fill(0)
    counter[0] = 1;
    values[0] = 1;

    while (counter.some((x) => x == 1)) {
        let value = 1;
        let c = 0;
        for (let i = 0; i < n - k; i++) {
            if (counter[i] == 1) {
                value *= (-Math.pow(primitive, i + 1) % modulo + modulo) % modulo;
                c++;
            }
        }
        values[c] += value;

        for (let i = 0; i < n - k; i++) {
            if (counter[i] == 0) {
                counter[i] = 1;
                break;
            }
            counter[i] = 0;
        }
    }

    genPolynom.value = "";
    for (let i = 0; i < n - k + 1; i++) {
        genPolynom.value += values[i] % modulo + "x^" + (n - k - i);
        if (i != n - k) {
            genPolynom.value += " + ";
        }
    }

    let parPolynom = document.querySelector("#cyclicPar");

    let codeShift = document.querySelector("#cyclicCodeShift");
    codeShift.innerHTML = "";
    for (let i = 0; i < n - k + 1; i++) {
        codeShift.value += values[values.length - i - 1] % modulo;
        if (i != n - k) {
            codeShift.value += ",";
        }
    }

    let message = document.querySelector("#cyclicMessage");
    message.innerHTML = "";
    for (let i = 0; i < n - k + 1; i++) {
        message.value += ((i == 0 ? 1 : 0) - values[values.length - i - 1] % modulo + modulo) % modulo;
        if (i != n - k) {
            message.value += ",";
        }
    }

    values = Array(k + 1).fill(0);
    counter = Array(k).fill(0)
    counter[0] = 1;
    values[0] = 1;

    while (counter.some((x) => x == 1)) {
        let value = 1;
        let c = 0;
        for (let i = 0; i < k; i++) {
            if (counter[i] == 1) {
                value *= (-Math.pow(primitive, i + n - k + 1) % modulo + modulo) % modulo;
                c++;
            }
        }
        values[c] += value;

        for (let i = 0; i < k; i++) {
            if (counter[i] == 0) {
                counter[i] = 1;
                break;
            }
            counter[i] = 0;
        }
    }

    parPolynom.value = "";
    for (let i = 0; i < n - k + 1; i++) {
        parPolynom.value += values[i] % modulo + "x^" + (n - k - i);
        if (i != n - k) {
            parPolynom.value += " + ";
        }
    }

    document.querySelector("#cyclicResults").hidden = false;
}
