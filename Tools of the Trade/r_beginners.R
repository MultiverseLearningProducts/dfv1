# This is a script to play around with and learn the basics of R
# To run each line, use ctrl + R (Windows) or cmd + R (Mac)

# Assignment Operator and Variables
some_variable <- "Hello World!"

# Outputting Variable Values
print(some_variable) # you can get an output using print...
some_variable # ... or you can just call the variable

# You can also assign the results of a calculation to a variable
a <- 1 + 2
b = 1 + 2

# Assign and Output
(A <- 1 + 2)
(B = 1 + 2) # n.b: variables are case sensitive

################################

# Numbers - Double
mynumeric <- 0.2
mynumeric2 <- 20
typeof(mynumeric)
typeof(mynumeric2)

# Numbers - Coercion
myinteger <- as.integer(mynumeric2)
typeof(myinteger)

################################

# Boolean
mylogical <- TRUE # TRUE or FALSE
mylogical2 <- F # you can also use T or F
typeof(mylogical)
typeof(mylogical2)

################################

# Character
mywords <- "some words"
mycharacter <- "character"
typeof(mywords)
typeof(mycharacter)
# n.b: in R, characters and strings are all "character" types

################################

# Vector
# All elements in a vector have to have the same data type
# Examples above are technically vectors of length 1
(vec1 <- c(1,2,3,4,5,6)) # numeric
typeof(vec1)
(vec2 <- c(T,F,F, TRUE, FALSE, TRUE)) # boolean (logical)
typeof(vec2)
(vec3 <- c("a", "b", "c", "d")) # character
typeof(vec3)

# Vector - Type coercion
# Vectors will automatically transform types that are different to the closest logical one
(vec4 <- c(1, 2, 3, TRUE, FALSE, 3, F, 6)) # will be numeric
typeof(vec4)
(vec5 <- c("a", TRUE, 1, 5, 5, "b", "g")) # will be character
typeof(vec5)
# vectors coerce to the type of the first item in the vector

# Vector - Indexing
# Vectors can be indexed with square brackets
# R is 1-indexed (indexing starts at 1, not 0)
vec1[2] # 2nd element of vector 1
vec2[4] # 4th element of vector 2
vec3[5] # NA because vec3 only has 4 items. Can you fix it?

# Vector - Slicing
vec1
vec1[1:4]

vec4
vec4[2:5]
# n.b: it's the same as Python

# Vector - Filtering
filter = c(F, T, F, T, T, F, T)
vec5
vec5[filter]
vec3
vec3[-3]

# Proof that everything is a vector
(vec <- 5[1]) # 5 gets made as a vector of length 1
is.vector(vec) # n.b: is.vector is similar to saying is_vector in Python (. is used instead of _ in R)
################################

# Factor
(myfactor <- factor(c("female", "male")))
typeof(myfactor)

################################

# List
(mylist <- list(vec1, vec2, vec3))
# lists can contain other lists
(mylist <- list(vec4, vec5, mylist))

# List - Indexing
mylist[[1]] # get vector from list
mylist[1] # get list of length 1, with vector inside

# List - Naming
(myNamedList <- list("a" = vec1, 
                    "vec2" = vec2, 
                    namewithoutquotes = vec3,
                    mynumber = 20, mylist, mean))

myNamedList$namewithoutquotes # dollar used to choose name
myNamedList$a

names(myNamedList) # last 2 don't have names

################################

# Data Frame
data.frame(vec1, vec2, vec3) # this will error (different lengths of vectors)
(df <- data.frame(vec1, vec2))
(df <- data.frame("Col 1"=vec1, "Col 2"=vec2)) # provide column names

# Data Frame - Accessing Columns
df$Col.1 # using column name
df[[1]] # using index
df[[1]][4] # getting a specific element (uses vector indexing like above)

# Data Frame - Accessing row and column
df[4, 2] # get 4th row, 2nd column (row, col)
df[,2] # get all rows, 2nd column
df[[2]] # same as above
df[c(1,3,4),] # get rows 1, 3 and 4, and all columns

################################

# Matrix

(mymatrix <- matrix(vec4, 2, 4)) # input: data, rows, columns
(mymatrix2 <- matrix(vec4, 2, 4, byrow = T)) # data input by row
colnames(mymatrix) # matrices don't have column names, unlike data.frames

# Matrix - Indexing
mymatrix[2, 4] # get 4th row, 2nd column (row, col)
mymatrix[,2] # get all rows, 2nd column
mymatrix[[2]] # gets the 2nd item in the whole matrix (from up to down, left to right):
# 1 3 5 7
# 2 4 6 8
mymatrix[,c(1,3,4)] # get all rows and columns 1, 3 and 4

################################

# Functions
new_sum <- function(value1, value2) {
  results <- value1 + value2
  return(results)
}
new_sum(10, 20) # positional arguments
new_sum(value2=10, value1=20) # keyword arguments

new_sum <- function(value1, value2) {
  results <- value1 + value2
  results
} # if there's no return, the function returns the last called variable
new_sum(10, 20) # positional arguments
new_sum(value2=10, value1=20) # keyword arguments

# n.b: BEST PRACTICE is to use a return
# n.b 2: with no brackets, a function will show you the code of the function 
# (it won't call the function unless brackets are added)
new_sum 
