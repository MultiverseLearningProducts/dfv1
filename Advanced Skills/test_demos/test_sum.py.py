import unittest

def num_sum(x):
    output=0
    for i in x:
        output+=i
    return output

class MyTest(unittest.TestCase):
    def test(self):
        self.assertEqual(num_sum([2,3,4]),9)