import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthService } from '../core/services/auth.service';

const mockSupabaseResponse = {
  user: { id: '123', email: 'usuario@gmail.com' },
  session: { access_token: 'fake-token', user: { id: '123', email: 'usuario@gmail.com' } }
} as any;

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginPage,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- Inicialización ---

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  // --- Validación de email ---

  it('should mark email as invalid when it is empty', () => {
    component.loginForm.get('email')!.setValue('');
    expect(component.loginForm.get('email')!.hasError('required')).toBeTrue();
  });

  it('should mark email as invalid when the format is wrong', () => {
    component.loginForm.get('email')!.setValue('esto-no-es-email');
    expect(component.loginForm.get('email')!.hasError('email')).toBeTrue();
  });

  it('should mark email as valid when the format is correct', () => {
    component.loginForm.get('email')!.setValue('usuario@gmail.com');
    expect(component.loginForm.get('email')!.valid).toBeTrue();
  });

  // --- Validación de contraseña ---

  it('should mark password as invalid when it is empty', () => {
    component.loginForm.get('password')!.setValue('');
    expect(component.loginForm.get('password')!.hasError('required')).toBeTrue();
  });

  it('should mark password as valid when it has a value', () => {
    component.loginForm.get('password')!.setValue('12345');
    expect(component.loginForm.get('password')!.valid).toBeTrue();
  });

  // --- Método login() ---

  it('should not call AuthService if form is invalid', async () => {
    component.loginForm.setValue({ email: '', password: '' });
    await component.login();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should not call AuthService if email format is invalid', async () => {
    component.loginForm.setValue({ email: 'invalido', password: '12345' });
    await component.login();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call AuthService with correct credentials when form is valid', async () => {
    authServiceSpy.login.and.returnValue(Promise.resolve(mockSupabaseResponse));
    component.loginForm.setValue({ email: 'usuario@gmail.com', password: '12345' });

    await component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('usuario@gmail.com', '12345');
  });

  it('should navigate to /home after successful login', async () => {
    authServiceSpy.login.and.returnValue(Promise.resolve(mockSupabaseResponse));
    component.loginForm.setValue({ email: 'usuario@gmail.com', password: '12345' });

    await component.login();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home'], { replaceUrl: true });
  });

  it('should set errorMessage when login fails', async () => {
    authServiceSpy.login.and.returnValue(Promise.reject(new Error('fail')));
    component.loginForm.setValue({ email: 'usuario@gmail.com', password: '12345' });

    await component.login();

    expect(component.errorMessage).toBe('Email o contraseña incorrectos');
  });

  it('should set isLoading to false after login attempt regardless of result', async () => {
    authServiceSpy.login.and.returnValue(Promise.reject(new Error('fail')));
    component.loginForm.setValue({ email: 'usuario@gmail.com', password: '12345' });

    await component.login();

    expect(component.isLoading).toBeFalse();
  });

  it('should mark all fields as touched when login is called with invalid form', async () => {
    component.loginForm.setValue({ email: '', password: '' });
    await component.login();

    expect(component.loginForm.get('email')!.touched).toBeTrue();
    expect(component.loginForm.get('password')!.touched).toBeTrue();
  });
});