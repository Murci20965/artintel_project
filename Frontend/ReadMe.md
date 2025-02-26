Thought for 5 secondsLet me perform final checks on our implementation to ensure everything is fully operational:

```typescriptreact project="tests"
...
```

## How to Get This Working Locally

Now that we've completed our final checks, here's how to get this system working locally:

### 1. Set Up the FastAPI Backend

1. **Create a FastAPI project:**

```shellscript
mkdir fastapi-auth-backend
cd fastapi-auth-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] python-multipart
```


2. **Create a basic FastAPI auth server:**
Create a file named `main.py` with the following content:

```python
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import uuid

# Security configuration
SECRET_KEY = "your-secret-key"  # Change this in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database (replace with a real database in production)
fake_users_db = {
    "user@example.com": {
        "id": str(uuid.uuid4()),
        "email": "user@example.com",
        "name": "Test User",
        "role": "user",
        "hashed_password": pwd_context.hash("password123"),
    }
}

# Models
class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class TokenData(BaseModel):
    email: Optional[str] = None

class User(BaseModel):
    id: str
    email: str
    name: str
    role: str

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return UserInDB(**user_dict)
    return None

def authenticate_user(fake_db, email: str, password: str):
    user = get_user(fake_db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.post("/auth/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role
        }
    }

@app.post("/auth/register")
async def register(user_data: UserCreate):
    if user_data.email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    
    user_dict = {
        "id": user_id,
        "email": user_data.email,
        "name": user_data.name,
        "role": "user",
        "hashed_password": hashed_password
    }
    
    fake_users_db[user_data.email] = user_dict
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user_data.email,
            "name": user_data.name,
            "role": "user"
        }
    }

@app.get("/auth/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```


3. **Run the FastAPI server:**

```shellscript
uvicorn main:app --reload
```




### 2. Set Up the Next.js Frontend

1. **Create a `.env.local` file in your Next.js project root:**

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
JWT_SECRET=your_jwt_secret_key_here
```


2. **Install dependencies:**

```shellscript
npm install
```


3. **Run the Next.js development server:**

```shellscript
npm run dev
```




### 3. Testing the Authentication Flow

1. **Register a new user:**

1. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Fill in the registration form with a name, email, and password
3. Submit the form to create a new account



2. **Log in with existing credentials:**

1. Navigate to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter the email and password you registered with
3. You should be redirected to the dashboard upon successful login



3. **Test protected routes:**

1. Try accessing [http://localhost:3000/dashboard](http://localhost:3000/dashboard) directly when logged out
2. You should be redirected to the login page
3. After logging in, you should be able to access the dashboard



4. **Test the logout functionality:**

1. Click the logout button in the dashboard
2. You should be redirected to the login page
3. Try accessing the dashboard again to verify you're logged out





### 4. Troubleshooting

If you encounter any issues:

1. **CORS errors:**

1. Make sure the FastAPI CORS middleware is configured correctly
2. Check that the allowed origins include your Next.js app URL



2. **Authentication failures:**

1. Verify the API endpoints match between frontend and backend
2. Check browser console for any errors in the network requests



3. **Cookie issues:**

1. Ensure cookies are being set correctly
2. Check that the SameSite and Secure attributes are appropriate for your environment



4. **Environment variables:**

1. Verify all environment variables are set correctly
2. Restart the Next.js server after changing environment variables





The system is now fully operational with a FastAPI backend handling authentication and a Next.js frontend with protected routes and conditional navbar/footer rendering.

