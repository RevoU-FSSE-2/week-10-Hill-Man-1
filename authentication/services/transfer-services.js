const getAllTransfer = async (req, res, next) => {
    try {
        const transfers = await req.db.collection('transfer list').find().toArray();
        res.status(200).json({
            message: 'Transfer list was successfully retrieved',
            data: transfers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStatus = async (req, res, next) => {
    
};

const createTransfer = async (req, res, next) => {
    const { bank, accountNumber, name, amount } = req.body;

    try{
        const newTransfer = await req.db.collection('transfer list').insertOne ({ 
        bank,
        accountNumber, 
        name, 
        amount, 
        status: "pending"
        })

        res.status(200).json({
        message: 'Transfer created successfully',
        data: newTransfer
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {getAllTransfer, updateStatus, createTransfer};