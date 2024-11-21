import { Component } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-contact",
  standalone: true,
  templateUrl: "./contact.component.html", // Référence au fichier HTML
  styleUrls: ["./contact.component.scss"], // Facultatif si vous utilisez des styles
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    CommonModule
  ],
  providers: [MessageService],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.maxLength(300)]],
    });
  }

  get email() {
    return this.contactForm.get("email")!;
  }

  get message() {
    return this.contactForm.get("message")!;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.messageService.add({
        severity: "success",
        summary: "Succès",
        detail: "Demande de contact envoyée avec succès",
      });
      this.contactForm.reset();
    }
  }
}
