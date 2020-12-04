## Chat App

### useState Hook [more](https://youtu.be/O6P86uwfdR0)

- We can only use hooks inside of function components.
- We cannot use hooks inside the if statement or loops & cannot be nested in anything. They must be at top level inside the functional components.

- useState return two parameter - yourVariable & setYourVariable method.

**Syntax**

`const [state, setState] = useState(0);`

- First para is the current state
- second para is function that allows us to set the state.
- useState is a function & we can assign initial value of inside the useState ,here 0 is initial value of the num.

- Every time the comonent is rendered the useState initialize the current state.

eg - Set the counter

```bash
const [count, setCount] = useState(0);

// decreament count
setCount(prevCount=> prevCount-1);
// increament count
setCount(prevCount=> prevCount+1);
```

**Two ways of initializing the default value**

1. Directly - useState(value); - in this everytime the component is rendered the current value is initialize ,it avoided if initialize is some calculated from some complex method like fibonaci or API requests.

2. Using function value -

`const [count, setCount] = useState(()=>4);`

This makes sure current value is initialize only first time the component rendered just like the constructor in the class components.

### useEffect Hook [more](https://youtu.be/0ZJgIjIuY7U)

The useEffect hook is perfect for handling side effects caused by mounting, un-mounting, changing state, etc.

Side Effects are calling API, or Database Query etc that will takes times.

Everytime components render the useEffect will run.

**Syntax**

```
useEffect(()=>{
console.log('render');
},[para1,para2,...]);

```

if we want to run useEffect only when some resources changed then pass them in the array as para1, para2 etc

example :

```
const [resource,setResource] = useState('posts');
useEffect (()=>{

console.log('render');

},[resource]);
```

- **Run useEffect only for onMount then empty the array**

### useRef Hook [more](https://youtu.be/t2ypzz6gJm0)
