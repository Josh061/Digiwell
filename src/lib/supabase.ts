import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://rqeipfewtwwvepzbkntp.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImExNjA2NzBmLTgxZjktNDY5Yi1hMmQwLWUyYWI5MmViZDNiMyJ9.eyJwcm9qZWN0SWQiOiJycWVpcGZld3R3d3ZlcHpia250cCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYyODg4NTQ2LCJleHAiOjIwNzgyNDg1NDYsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.zxE3Djcbmno_crt-hqi9KJIw4VWo4nroSvBnKDPe4fc';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };