import React, { useState } from 'react';
import "../Styles/SearchSort.css"

function Sorting() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [isgenerated, setisgenerated] = useState(false);
  var size = 25;

  if(window.innerWidth <= 650){
    size = 18;
  }
  // Generate a new random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(newArray);
    setisgenerated(true);
    setSorting(false);
  };

  // Bubble Sort algorithm
  const bubbleSort = async () => {
    setSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        arrayBars[j].style.backgroundColor = 'red';
        arrayBars[j + 1].style.backgroundColor = 'red';
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 100)
        );
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          setArray([...array]);
        }
        arrayBars[j].style.backgroundColor = 'blue';
        arrayBars[j + 1].style.backgroundColor = 'blue';
      }
      arrayBars[array.length - i - 1].style.backgroundColor = 'green';
    }
    arrayBars[0].style.backgroundColor = 'green';
  };

  // Selection Sort algorithm
  const selectionSort = async () => {
    setSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      arrayBars[i].style.backgroundColor = 'red';
      for (let j = i + 1; j < array.length; j++) {
        arrayBars[j].style.backgroundColor = 'red';
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 100)
        );
        if (array[j] < array[minIndex]) {
          arrayBars[minIndex].style.backgroundColor = 'blue';
          minIndex = j;
          arrayBars[minIndex].style.backgroundColor = 'red';
        } else {
          arrayBars[j].style.backgroundColor = 'blue';
        }
      }
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      setArray([...array]);
      arrayBars[minIndex].style.backgroundColor = 'blue';
      arrayBars[i].style.backgroundColor = 'green';
    }
    arrayBars[array.length - 1].style.backgroundColor = 'green';
  };

  // Insertion Sort algorithm
  const insertionSort = async () => {
    setSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      arrayBars[i].style.backgroundColor = 'red';
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 100)
      );
      while (j >= 0 && array[j] > key) {
        arrayBars[j].style.backgroundColor = 'red';
        array[j + 1] = array[j];
        setArray([...array]);
        arrayBars[j].style.backgroundColor = 'blue';
        j--;
      }
      array[j + 1] = key;
      setArray([...array]);
      arrayBars[i].style.backgroundColor = 'blue';
    }
    for (let i = 0; i < array.length; i++) {
      arrayBars[i].style.backgroundColor = 'green';
    }
  };

  // Quick Sort algorithm
  const quickSort = async (start, end) => {
    if (start >= end) return;
    const pivotIndex = await partition(start, end);
    await Promise.all([
      quickSort(start, pivotIndex - 1),
      quickSort(pivotIndex + 1, end),
    ]);
  };

  const partition = async (start, end) => {
    const pivotValue = array[end];
    let pivotIndex = start;
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = start; i < end; i++) {
      arrayBars[i].style.backgroundColor = 'red';
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 100)
      );
      if (array[i] < pivotValue) {
        swap(i, pivotIndex);
        arrayBars[pivotIndex].style.backgroundColor = 'blue';
        pivotIndex++;
      } else {
        arrayBars[i].style.backgroundColor = 'blue';
      }
    }
    swap(pivotIndex, end);
    for (let i = start; i <= end; i++) {
      if (i !== pivotIndex) {
        arrayBars[i].style.backgroundColor = 'green';
      }
    }
    return pivotIndex;
  };

  const swap = (i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    setArray([...array]);
  };

  const runQuickSort = async () => {
    setSorting(true);
    await quickSort(0, array.length - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sorting Algorithms Visualizer</h1>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <button style={{backgroundColor:"blue " }} onClick={generateArray} >
            Generate New Array
          </button>
        {isgenerated && !sorting && <div className="button-container">
          
          <button onClick={bubbleSort} disabled={sorting}>
            Bubble Sort
          </button>
          <button onClick={selectionSort} disabled={sorting}>
            Selection Sort
          </button>
          <button onClick={insertionSort} disabled={sorting}>
            Insertion Sort
          </button>
          <button onClick={runQuickSort} disabled={sorting}>
            Quick Sort
          </button>
        </div>
}
      </header>
    </div>
  );
}

export default Sorting;