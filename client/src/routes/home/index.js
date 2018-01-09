import { h, Component } from "preact";
import style from "./style";
import Button from "../../components/button/index.js";
import { api } from "../../config";

export default class Home extends Component {
  state = {
    faqOpen: false,
    submissionForm: {
      email: "",
      name: "",
      topics: "",
      bio: ""
    }
  };

  toggleFaq = () => {
    this.setState({ faqOpen: !this.state.faqOpen });
  };

  updateForm = e => {
    this.setState({
      submissionForm: {
        ...this.state.submissionForm,
        [e.target.id]: e.target.value
      }
    });
  };

  submitForm = e => {
    e.preventDefault();
    fetch(`${api}/speaker-submission`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.submissionForm)
    }).then(function(response) {
      console.log("post res is", response);
      return response.json();
    }).then(function(data) {
      console.log("incoming data is", data);
    });

    console.log(this.state.submissionForm);
  };


  // -- Sub views --

  // displays the FAQ questions when faqOpen is true.
  faqView = () => (
    <section class="bg-near-white bb bt b--light-gray mv4 pa4">
      <div class="w-70 center">
        <p class="i">
          Hi, welcome to the Toronto tech community's speaker portal! We want to make it super easy for speakers and organizers to find each other, so we put together this handy form.
        </p>

        <p>
          <div>Q: Who sees this information? </div>
          <div>
            A: Only organizers from Toronto technical organizations see the information you add here. Organizers for Toronto JS, Clojure TO, Functional TO, Polyhack, and Papers We Love TO currently have access.
          </div>
        </p>

        <div>Q: I'm an organizer and we'd love to use this?!</div>
        <div>
          A: Great, reach out to us and let's talk! Email dann@torontojs.com and we'll set up a conversation to vet you and get you onboard.
        </div>
      </div>
    </section>
  );

  submissionFormView = () => {
    const { email, name, topics, bio } = this.state.submissionForm;
    return (
      <form class="flex flex-column mv5 w-50 center" onSubmit={this.submitForm}>
        <label for="Email">Email address</label>
        <input
          class="pa2 mb4"
          id="email"
          type="text"
          value={email}
          onChange={this.updateForm}
          placeholder="Email"
        />

        <label for="name">What is your name?</label>
        <input
          class="pa2 mb4"
          id="name"
          type="text"
          value={name}
          onChange={this.updateForm}
          placeholder="Name"
        />

        <label for="topics">
          One or more topics you'd like to talk about
        </label>
        <input
          class="pa2 mb4"
          id="topics"
          type="text"
          placeholder="Topics"
          onChange={this.updateForm}
          value={topics}
        />

        <label for="bio">Your Bio (optional, to put on RSVP pages)</label>
        <textarea class="pa2 mb4" id="bio" value={bio} placeholder="Bio" />

        <Button class="mv2">Submit</Button>
      </form>
    );
  };

  // --

  render() {
    return (
      <div class={style.home}>
        {/* SECTION: Big hero Copy Text + buttons */}
        <header class="bg-blue washed-yellow">
          <div class="hero w-80 pa4 pv6 ml3">
            <div class="f-subheadline lh-title b">
              Welcome to
              <span class="i"> Speak Friend:</span>
            </div>
            <div class="f-subheadline lh-title b i mt4 bg-navy dib washed-yellow pa2">
              Toronto
            </div>
            <h3 class="f2 lh-copy">
              A portal for connecting speakers, mentors, and friends.
            </h3>
            <Button class="mr4">I'm looking to give a talk! 🎤 </Button>
            <Button>I can host talks! 🏫</Button>
          </div>
        </header>

        {/* SPACER */}
        <div class="w-100 bg-grey bb b--black-05 bw3" />

        {/* SECTION: Form Submission */}
        <section class="pv4 center">
          <h1 class="f1 lh-title tc">I'd like to give a talk!</h1>
          <p class="w-50 center tc">
            Awesome. Feel free to read our
            {" "}
            <a onClick={() => this.toggleFaq()}>FAQ</a>
            {" "}
            before submitting your info.
          </p>

          {this.state.faqOpen && this.faqView()}
          {this.submissionFormView()}

        </section>

      </div>
    );
  }
}
