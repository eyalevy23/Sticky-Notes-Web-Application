export class FormValidation {
  constructor(textArea, date, time) {
    this.textArea = textArea;
    this.date = date;
    this.time = time;

    this.validFields = {
      textLabel: false,
      dateLabel: true,
      timeLabel: true,
    };

    this.cacheDomElementsLabel();
    this.setUpEventListener();
  }

  setUpEventListener() {
    this.date.addEventListener("change", (e) => this.handleDateOnChange(e));
    this.time.addEventListener("change", (e) => this.handleTimeOnChange(e));
    this.textArea.addEventListener("input", (e) =>
      this.handleTextAreaOnChange(e)
    );
  }

  cacheDomElementsLabel() {
    this.labelElement = {
      textLabel: document.getElementById("text-label"),
      dateLabel: document.getElementById("date-label"),
      timeLabel: document.getElementById("time-label"),
    };
  }

  handleDateOnChange(event) {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const isValid = selectedDate >= today;
    this.setErrorColor("dateLabel", !isValid);

    if (!isValid) {
      console.error("You have to pick today or a future day");
    }

    // Collapse date picker menu
    this.date.blur();
  }

  handleTimeOnChange(event) {
    const selectedTime = event.target.value;
    if (!selectedTime) {
      this.setErrorColor("timeLabel", true);
      console.error("You have to pick a time");
    } else {
      this.setErrorColor("timeLabel", false);
    }
  }

  handleTextAreaOnChange(event) {
    const textValue = event.target.value;
    if (!textValue) {
      this.setErrorColor("textLabel", true);
      console.error("You have to enter some text");
    } else {
      this.setErrorColor("textLabel", false);
    }
  }

  setErrorColor(labelName, isError) {
    const label = this.labelElement[labelName];
    if (label) {
      label.classList.toggle("text-gray-700", !isError);
      label.classList.toggle("border-gray-400", !isError);
      label.classList.toggle("text-red-500", isError);
      label.classList.toggle("border-red-400", isError);

      this.validFields[labelName] = !isError;
    }
  }

  setBounceAnimation(labelName) {
    const label = this.labelElement[labelName];
    if (label) {
      label.classList.add("bounce-effect");
      setTimeout(() => {
        label.classList.remove("bounce-effect");
      }, 1000);
    }
  }

  isValidForm() {
    const isValid =
      this.validFields.dateLabel &&
      this.validFields.timeLabel &&
      this.validFields.textLabel;

    if (!isValid) {
      Object.entries(this.validFields).forEach(([key, value]) => {
        if (!value) {
          this.setBounceAnimation(key);
          this.setErrorColor(key, true);
        }
      });
    }
    return isValid;
  }

  resetFormFields() {
    this.setErrorColor("textLabel", false);
    this.setErrorColor("dateLabel", false);
    this.setErrorColor("timeLabel", false);

    this.validFields = {
      textLabel: false,
      dateLabel: true,
      timeLabel: true,
    };
  }
}
