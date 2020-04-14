import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcomes = new Array;
    const incomes = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      } else {
        outcomes.push(transaction.value);
        return 0;
      }
    });

    let incomeValue = 0;
    let outcomeValue = 0;

    if (incomes.length > 0) {
      incomeValue = incomes.reduce((accumulator, currentValue) => {
        return accumulator += currentValue;
      });
    };

    if (outcomes.length > 0) {
      outcomeValue = outcomes.reduce((accumulator, currentValue) => {
        return accumulator += currentValue;
      })
    }

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
