1/12

Lesson 0:
  (A)
  Whenever you're learning a new tool, it's good to understand why that tool exists in the first place. So the question I want to answer in this video, is why does Redux exist? If you think about any bug you've ever encountered during your career as a developer, the cause of that bug probably stemmed from some state or data mismanagement inside of your application. So because state mismanagement leads to bugs, if we had a way to better manage the state of our app, we could, theoretically, decrease the amount of bugs in that app. This is what Redux attemps to solve. The whole goal of Redux is to make state management in your application more predictable. Now, if you took our React fundamentals course you may be a bit confused, because, we claimed that one of React's strengths is state management as well. So let me explain. React really is great at state management. So if React already excels at state management, why does Redux exist? In my opinion, there are two main reasons. First, shared state. What if two components rely on the same piece of state? In the fundamentals course you were taught to hoist that piece of state up to the nearest parent component. That's an effective strategy, most of the time. But what if the nearest parent component was 3-4 components up the component tree? Then you'd need to, quite painfully, pass that data down as props 3-4 layers to both components. With Redux, instead of passing that data through intermediate components which don't need it, you can instead tell Redux exactly which components need which data, and it'll take care of the rest. The 2nd benefit of Redux is caching. By its nature, Redux makes it easier to cache API calls or expensive operations which in turn will lead to a better user experience. Though Redux isn't neccessary to create an application with React, it does make some things a lot easier.

  (B)
  Now that you know that the whole point of Redux is to more predictably manage state inside of your application, the next question you probably have is how does Redux accomplish this? First, is by having a single source of truth for most of the state in your app. So, instead of having all of your state live inside of your React components, with Redux, you store most of it inside of a JavaScript object which Redux refers to as a "store". Then, by having most of your state inside of this store, Redux can estbalish rules for how to update it. And then, by having a strict set of rules for how to update the state inside of your store, you naturally make state changes inside of your app more predictable. Now, I realize that was really high level. So let's take a look a real world example. [[Some metaphor Richy will help me think of]].

  (C)
  As I mentioned in the last video, Redux makes state management in your application more predictable by having a single source of truth for most of the state in your app, and by setting strict rules for how you can update that state. Now, you may have noticed that I keep saying that Redux handles "most" of the state in your application. This is a topic of hot debate in the React community but I want to share with you what my definition of "most state" is. When you add Redux to your React app, that doesn't mean that you should never use component state again. (component state being any state that you update with this.setState as you're used to). This was the natural knee jerk reaction when Redux first came out. Redux isn't supposed to manage ALL of the state in your application and by doing that you just make things more complicated than they need to be. Now there's no clear rule for describing which state should live in a Redux store and which should live in a React component, but here's a helpful comment from the creator of Redux, Dan Ah-BrÁ-Mov himself. "Use React for short lived state that doesn't matter to the app globally and doesn't mutate in complex ways. For example, a toggle in some UI element or a form input state. Use Redux for state that matters globally or is mutated in complex ways. For example, cached users, or a post draft." This aligns well with what we talked about in a previous video. Redux excels at handling shared state (or global state as Dan refers to it) as well as caching - React component state is great for everything else.

Lesson 2
  (D) Reducers
  Now that you understand that Redux improves state management by storing all of its state in a single "store" and by defining strict rules for how you update that store, next, let's talk about what these strict rules actually are. This brings us to the concept of Reducers. Reducers do two things - first, they specify the "shape" of our "store", and second, and most important, they allow us to specify how our store will change, based off certain events. So say we wanted to have the shape of our Redux store to look something like this. We have an object which has one key, todos. todos is an array with each item being a specific todo as well as if it's been completed or not. This is the minimal representation of our app as a plain object. Based on this state, here's what a Reducer would need to look like in order to give the store our desired shape. Now, even though this code is pretty straight forward, it sheds a lot of insight into what a Reducer in Redux actually is. First, what's great about Reducers (and really Redux in general) is that there's really no "magic" going on here. Reducers are just functions that Redux will call whenever any action you specify inside of your application happens. Next, you'll notice that our reducer function has two parameters. The current state as well as the action which occured. The whole idea here is that when some event happens that needs to change the state of your application, this Reducer function will be invoked, it'll be passed the current state as well as the action which occured, then, the state that it returns will be the new state of the application. So again, at its core, a reducer function takes in the current state, an action that occured, and returns the next state of the store. So here, whenever a 'ADD_TODO' action occurs, we return a new object, which is the same as the previous state except for we've added the new todo item to the end of our todos array. NOTE! we're not modyfing the state parameter directly. This is a critical part of Reducers. Never modify the state object directly. Instead, return a new object or create a clone of the state and modify that clone. The reason for this is Redux uses shallow reference equality checks to detect changes in your state. This means that changes made to objects and arrays by direct mutation will not be detected, and, eventually when paired with React, by not being able to detect changes, Redux won't be able to pass updated data to components. Now, what if our state got a little more complex. Instead of having one property, let's add another. Now, we have a todos property as well as a visibilityFilter property. Because of this change, we now need to update our Reducer function. Based on our previous reducer, You'll notice that if the 'ADD_TODO' action occurs, we just return a new object which has an update todos. However, now that we've added visibilityFilter, by returning an object which has only a single todos property as we're currently doing, the new state of our application will just be what we returned, which obviously doesn't have a visibilityFilter property. To fix this, instead of just returning the updated todos, we also want to return whatever visibilityFilter current is. Now, this code solves the problem, but what happens if we update the shape of our store again in the future, we'll have to update our reducer function again passing along that new state. This is where ES6's Object Spread can help us out. It allows us to merge two object together. So now, we're saying we want to return a new object which has all of the previous properties of state, but now "todos" will be this new thing. Now the very last thing we need to cover about reducers, is how we can specify the initial state of our store. The very first time that Redux calls our reducer, it will call it with the first argument, state, set to undefined. By listening for this, we're able to then set the initial state. Here we're using ES6's default parameters feature so that whenever "state" is undefined, it will then be set to our initialState valuenwhich has our visibilityFilter set to 'All' and our todos set to an empty array. So to recap, a reducer function takes in the current state, an action that occured, and returns the next state of the store based off that action AND the very first time a reducer is called, the state argument will be undefined which allows you to set the initial state of your store.

  (E) Actions
  When we talked about reducers we mentioned that "a reducer function takes in the current state, an action that occured, and returns the next state of the store based off of that action". Now the question is, how do we define what type of actions occurr in our app? This introduces the topic of, well, as you can probably guess "Actions" in Redux. Actions are payloads of information that describe a specific event or state change in your application. So for every event in your app that changes the state of the store, you'll need to create an "action". Here's an example action which represents adding a new item to our todo list. Notice that it's just a JavaScript object. The "type" property is the only property that is required because it indicates the type of action being performed. Now, if we look back at our Reducer function, you'll notice that we're listening for a "type" of 'ADD_TODO'. This is where actions and reducers come together. Again, actions are payloads of information that describe a specific event or state change, and whenever an action is dispatched, your reducer function will be invoked, it will then return a new state based off of the action that was dispatched. So in our example here, whenever the 'ADD_TODO' action is dispatched, the if statement in our reducer will evaluate to true, which will return a new object after adding the new todo item to the todos array. This new returned object will then become the new state of the store. Now the question becomes, "how do we dispatch different actions?" That answer will come, in a future video.

  (F) createStore
  Up until this point we've talked a lot about how with Redux, you have a single source of truth for most of the state in your app called a "store", and a reducer function that takes in that store, an action, then returns the next state of the store. What we haven't talked about, is how you actually create a store and what properties are available to you, once you do. Luckily once you already have a reducer function, creating a store is pretty straight forward. When you import Redux into your application, you import an object which has a "createStore" method on it. When you invoke createStore, the first argument you need to pass it is your Reducer function. By doing this, the return value of that invocation will be your store. The biggest responsibility of the store, as we've talked about, is that it holds most of the application's state interally. It also gives you a few helper methods, for you to interact with it. We'll cover each of these more in depth in future videos, but for now, it's just good to know they exist. The three important methods are getState, which allows access to the store's state. dispatch which is how you go about updating the store's state. and subscribe, which allows you to register listeners so you can be informed whenever the state of your store changes.

  (G) react-redux
  Let's take a step back and review what we know and what we don't know about Redux so far. We know that Redux is used for state management. We know that with Redux you have a single source of truth for most of the state in your app called a "store". We know that actions describe different state changing events that occur in your application and we know that reducers take in the current state, the action that occured, and return the next state of the store based off of that action. Won't we don't know is how to dispatch actions or how to gain access to Redux's store, from inside of a React component. Up until this point we've been living in theoretical land with Redux. Theoretical land is great, but there comes a point where we need to get more pragmatic in our approach. That's what we'll be doing, in this and in future videos. More specifically, we'll look at how to tie Redux into a React application. Everything we've done before this, has been purely agnostic to any sort of framework. Redux was designed so that you could use it with not only React, but also other frameworks and libraries like Angular, Vue, or even web components. With that said, typically there are helper bindings that you can install to make Redux work more smoothly with whatever framework or library you're using. If you're using Redux with React, as we'll be doing, you can install the 'react-redux' bindings from NPM to make your experience a little more fluid. Now admittedly it can be a bit confusing to know what's part of "Redux" and what's part of "react-redux", but I'll do my best to make that separation clear as we go along. When you install and import react-redux into your project, you'll be given two helper methods. They are "connect" and "Provider". We'll talk about each of those more in depth in the next videos, but for now know that the connect method makes it so your React components can easily subscribe and gain access to the state in your Redux store and Provider makes connect possible.

  (H) connect()
  Whenever you create a "store" using createStore in Redux, that store object has a few different helper methods on it. As mentioned in a previous video "The three important methods are getState, which allows access to the store's state. dispatch which is how you go about updating the store's state. and subscribe, which allows you to register listeners so you can be informed whenever the state of your store changes." The reason we didn't go into depth with any of these before, is that the react-redux bindings provide a nice abstraction over all three of these. If you take a step back and think about Redux in its simplest form, all we're doing is moving some component state out to a global state tree. With that said, we still need a way to update that state tree and we still need a way to gain access to it from our React components. This is where connect() comes into play. Whenever a React component needs to dispatch an action or gain access to the state of your Redux store, you'll use connect(). Let's first look at dispatching an action. Here we have a function called addTodo which is returning our ADD_TODO action we saw earlier. This is a common pattern because passing around objects gets a little tedious, so by wrapping them in functions, we can now just invoke the function to get the specific action. These type of functions are called "Action Creators". Now, say we had a TodoList component that looked like this. The first goal here is to make it so that when the addItem method of our commponent is invoked, it will dispatch the addTodo action, which eventually will update our Redux store. To solve this problem and to gain access to Redux's "dispatch" method, we'll need to wrap the export of TodoList inside of the function that connect() returns. Now, this double invocation thing may look a little weird. What's happening is you invoke connect() which returns you a function, then you pass that function the component you want to connect. Now, when you do that, the component will be passed a "dispatch" method and its this dispatch method which will allow us to dispatch our action. So now, when addItem is invoked, we dispatch the result of calling our addTodo action creator passing it the todo item. Then, our reducer function will be invoked, and the new todo item will be added to our list of todos in our Redux store. Now, what's up with that weird double invocation syntax? This leads us to our next problem which is getting access to the Redux store from inside of our component. The first argument that you pass to connect() is a function which specifies which state from the Redux store you want this component to be passed. So for example, we want our TodoList component to be passed both visibilityFilter as well as our array of todos. So, that will look something like this, mapStateToProps will be passed the state of the Redux store as its first argument, and whatever properties on the object it returns will be passed to the React component as props. So now, our TodoList commponent will be passed as props both visibilityFilter and todos which both live inside of the Redux store. And to update either of those, we'll use dispatch as we see here in the addItem method.

  (I) Provider
  We talked in the last video how connect() allows us to not only gain access to Redux's dispatch method, but it also allow us to subscribe React components to specific properties of our Redux store. There's one small caveat here that we need to add. In order to make connect possible, we need to make sure that we wrap our app inside of Redux's "Provider" component. Now don't worry, this is actually really striaght forward. All you have to do, is go to wherever you're calling "React.render" at the root of your app, and wrap that component inside of Provider, passing provider the Redux store that you created. Again, this step is neccessary because it ties your Redux store to your React app, and it also makes it possible for Redux to pass state to your components without having to pass it down every component in the component tree.